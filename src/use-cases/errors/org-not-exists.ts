export class OrgNotExistsError extends Error {
  constructor() {
    super('Organization not exists')
  }
}
