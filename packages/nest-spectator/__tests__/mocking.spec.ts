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

  describe('Getter and Setters', () => {

    let module: TestingModule;
    let primaryService: PrimaryService;

    beforeEach(async () => {
      module = await createTestingModuleFactory(
          {
            imports: [],
            controllers: [PrimaryController],
            providers: [PrimaryService],
            mocks: [PrimaryService]
          },
      ).compile();

      primaryService = module.get<PrimaryService>(PrimaryService);
    });

    it('should spy on the set method', () => {
      primaryService.fieldOne = 'Hello World';
      expect(primaryService.fieldOne).toHaveBeenCalledWith('Hello World');
    });

    it('should spy on the get method', () => {
      const val = primaryService.fieldOne;
      expect(primaryService.fieldOne).toHaveBeenCalled();
    });

  });

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
