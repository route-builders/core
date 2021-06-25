export class RequiredUUIDError implements Error {
  name = 'RequiredUUIDError';
  message = 'required uuid, but empty ( or undefined )';
}
