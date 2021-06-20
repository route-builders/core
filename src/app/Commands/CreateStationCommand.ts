import * as z from 'zod';
import { Station } from '../../Domain/models/Station';
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
import { IStorage } from '../../Infra/DB/IStorage';
import { StationRepository } from '../../Infra/StationRepository';
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
  private invoked: boolean;
  private invokedData: Station | undefined;
  private repository: StationRepository;
  private createStationInput: CreateStationInput;

  constructor(props: CreateStationInput, storage: IStorage) {
    this.invoked = false;
    this.createStationInput = createStationInputSchema.parse(props);
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
    }
  }
  undo(): void {
    if (this.invokedData && this.invoked) {
      this.repository.removeStation({ uuid: this.invokedData?.uuid });
      this.invoked = false;
    }
  }
}
