import * as z from 'zod';
import { NetworkCommandValue } from '../../Domain/factories/NetworkCommandFactory';
import { Station } from '../../Domain/models/Station';
import { NetworkCommandData } from '../../Domain/values/NetworkCommand/NetworkCommandData';
import { NetworkCommandName } from '../../Domain/values/NetworkCommand/NetworkCommandName';
import { StationName, stationNameSchema } from '../../Domain/values/Station/StationName';
import { StationScale, stationScaleSchema } from '../../Domain/values/Station/StationScale';
import {
  StationTimeDisplayFormat,
  stationTimeDisplayFormatSchema,
} from '../../Domain/values/Station/StationTimeDisplayFormat';
import {
  StationTrainInfoDisplayFormat,
  stationTrainInfoDisplayFormatSchema,
} from '../../Domain/values/Station/StationTrainInfoDisplayFormat';
import { InvokedUnExecutionCommandError } from '../../errors/InvokedUnExecutionCommandError';
import { NoRevertDataError } from '../../errors/NoRevertDataError';
import { ReInvokeCommandError } from '../../errors/ReInvokeCommandError';
import { IStorage } from '../../Infra/DB/IStorage';
import { StationRepository } from '../../Infra/Repositories/StationRepository';
import { ICommand } from './ICommand';

const createStationInputSchema = z.object({
  name: stationNameSchema,
  timeDisplayFormat: stationTimeDisplayFormatSchema,
  scale: stationScaleSchema,
  inboundTrainInfoDisplayFormat: stationTrainInfoDisplayFormatSchema,
  outboundTrainInfoDisplayFormat: stationTrainInfoDisplayFormatSchema,
});

type CreateStationInput = z.infer<typeof createStationInputSchema>;

export class CreateStationCommand implements ICommand {
  public readonly priority = 100;

  private invoked: boolean;
  private invokedData: Station | undefined;
  private repository: StationRepository;
  private createStationInput: CreateStationInput;

  constructor(
    private props: {
      name: NetworkCommandName;
      originalData: NetworkCommandData;
      updatedData: NetworkCommandData;
    },
    storage: IStorage
  ) {
    this.invoked = false;
    this.createStationInput = createStationInputSchema.parse(props.updatedData.value);
    this.repository = new StationRepository(storage);
  }

  invoke(): void {
    if (!this.invoked) {
      this.invokedData = this.repository.createStation({
        name: new StationName(this.createStationInput.name),
        timeDisplayFormat: new StationTimeDisplayFormat(this.createStationInput.timeDisplayFormat),
        scale: new StationScale(this.createStationInput.scale),
        inboundTrainInfoDisplayFormat: new StationTrainInfoDisplayFormat(
          this.createStationInput.inboundTrainInfoDisplayFormat
        ),
        outboundTrainInfoDisplayFormat: new StationTrainInfoDisplayFormat(
          this.createStationInput.outboundTrainInfoDisplayFormat
        ),
      });
      this.invoked = true;
      return;
    }

    throw new ReInvokeCommandError(CreateStationCommand.name);
  }

  undo(): void {
    if (!this.invoked) {
      throw new InvokedUnExecutionCommandError(CreateStationCommand.name);
    }
    if (!this.invokedData) {
      throw new NoRevertDataError(CreateStationCommand.name);
    }

    this.repository.removeStation({ uuid: this.invokedData?.uuid });
    this.invoked = false;
  }

  get raw(): NetworkCommandValue & { invoked: boolean } {
    return {
      // FIXME: UUID
      uuid: '',
      name: this.props.name.value,
      originalData: this.props.originalData.value,
      updatedData: this.props.updatedData.value,
      invoked: this.invoked,
    };
  }

  toJSON(): string {
    return JSON.stringify(this.raw);
  }
}
