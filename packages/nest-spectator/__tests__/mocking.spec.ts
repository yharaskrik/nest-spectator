import {Controller, Injectable} from "@nestjs/common";
import {createTestingModuleFactory} from "../src/testing-module";
import {TestingModule} from "@nestjs/testing/testing-module";

describe('ProviderMock', () => {
  @Injectable()
  class SecondaryService {
  }

  @Injectable()
  class PrimaryService {
    constructor(secondaryService: SecondaryService) {
    }

    private _fieldOne: string;

    get fieldOne(): string {
      return this._fieldOne;
    }

    set fieldOne(val: string) {
      this._fieldOne = val;
    }

    testFunction(): void {
    }
  }

  @Controller()
  class PrimaryController {
    constructor(primaryService: PrimaryService) {
    }
  }

  it('should not require SecondaryService to be provided', async () => {
    const module = await createTestingModuleFactory(
        {
          imports: [],
          controllers: [PrimaryController],
          providers: [PrimaryService],
          mocks: [PrimaryService]
        },
    ).compile();

    const app = module.createNestApplication();

    const primaryService = module.get<PrimaryService>(PrimaryService);

    expect(primaryService).toBeTruthy();
    expect(app).toBeTruthy();
  });
});
