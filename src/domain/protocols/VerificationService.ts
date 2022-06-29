
export interface VerificationService {
  verify: (requestId: string) => Promise<any>
}
