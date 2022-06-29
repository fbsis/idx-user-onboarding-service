import { Person } from '../entities'
import { DomainAlreadyExistsException } from '../exceptions'
import { PersonQueryRepository, PersonCommandsRepository, ValidationService } from '../protocols'

export class ValidationPersonInteractor {
  constructor (
    private readonly validationService: ValidationService,
    private readonly personQueryService: PersonQueryRepository,
    private readonly personCommandService: PersonCommandsRepository
  ) {}

  async execute (person: Person): Promise<void> {
    const retrieve = await this.personQueryService.get(person)
    if (retrieve) throw new DomainAlreadyExistsException('Already a request for this person')

    const validate = await this.validationService.validate(person)
    await this.personCommandService.saveByRequestNumber(validate, person)
  }
}
