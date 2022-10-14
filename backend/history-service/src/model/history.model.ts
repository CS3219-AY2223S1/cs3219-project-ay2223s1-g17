import mongoose from 'mongoose';
import { IHistory, IHistoryModel } from './history.types';

const historySchema = new mongoose.Schema<IHistory, IHistoryModel>(
  {
    user: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    chats: {
      type: [
        {
          sender: {
            type: String,
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

historySchema.static(
  'saveHistory',
  /**
   * Attempts to create a History record with the required data
   *
   * @param history History object with required data
   * @returns Returns the created history object's ID
   */
  async function saveHistory(history: IHistory) {
    if (!history) throw new Error('History data is required');

    const res = await History.create(history);

    return { id: res._id };
  }
);

historySchema.static(
  'findHistoryById',
  /**
   * Attempts to find a History record by ID
   *
   * @param id id of a History record
   */
  async function findHistoryById(id: string) {
    if (!id) throw new Error('History id is required');

    const history = await History.findById(id);

    if (!history) throw new Error(`History record ${id} not found`);

    return history;
  }
);

const History = mongoose.model<IHistory, IHistoryModel>(
  'History',
  historySchema
);

export default History;
