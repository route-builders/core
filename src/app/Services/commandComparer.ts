import { ICommand } from '../Commands/ICommand';

export const commandComparer = (command1: ICommand, command2: ICommand): number =>
  command1.priority - command2.priority;
