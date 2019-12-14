import {Controller, Injectable} from "@nestjs/common";
import {createTestingModuleFactory} from "../src/testing-module";

describe('ProviderMock', () => {
  @Injectable()
  class SecondaryService {
  }

  @Injectable()
  class PrimaryService {
    constructor(secondaryService: SecondaryService) {
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
