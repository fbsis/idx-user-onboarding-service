import { Person } from '../entities'
import { DomainAlreadyExistsException } from '../exceptions'
import { PersonQueryRepository, PersonCommandsRepository, NotifyService, IPartnerService } from '../protocols'

export class RegisterPersonInteractor {
  constructor (
    private readonly personQueryService: PersonQueryRepository,
    private readonly personCommandService: PersonCommandsRepository,
    private readonly notifyService: NotifyService,
    private readonly partnerService: IPartnerService

  ) {}

  async execute (person: Person): Promise<void> {
    const retrieve = await this.personQueryService.getByDocumentId(person.documentId)
    if (retrieve) throw new DomainAlreadyExistsException('This register already exists on database')

    await this.personCommandService.registerPerson(person)

    const urlToNotify = await this.partnerService.getWebHookByPartnerId(person.partnerId)

    await this.notifyService.sendNotification(urlToNotify, 'register-person', person.toJson())
  }
}
