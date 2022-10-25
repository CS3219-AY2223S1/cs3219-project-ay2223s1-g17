import mongoose from 'mongoose';
import { IHistory, IHistoryModel } from './history.types';

const historySchema = new mongoose.Schema<IHistory, IHistoryModel>(
  {
    user: {
      type: String,
      required: true,
    },
    otherUser: {
      type: String,
      required: true,
    },
    question: {
      type: {
        title: {
          type: String,
        },
        difficulty: {
          type: String,
        },
        id: {
          type: String,
        },
      },
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    chats: {
      type: [
        {
          senderId: {
            type: String,
            required: true,
          },
          senderName: {
            type: String,
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
          time: {
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

    await History.create(history);
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

historySchema.static(
  'findHistoryByUser',
  /**
   * Attempts to find a History records by user id
   *
   * @param userId id of user
   */
  async function findHistoryById(userId: string) {
    if (!userId) throw new Error('History id is required');

    return History.find({ user: userId });
  }
);

historySchema.static(
  'deleteHistoryByUser',
  /**
   * Attempts to delete History records by user id
   *
   * @param userId id of user
   */
  async function findHistoryById(userId: string) {
    if (!userId) throw new Error('History id is required');

    await History.deleteMany({ user: userId });
  }
);

const History = mongoose.model<IHistory, IHistoryModel>(
  'History',
  historySchema
);

export default History;
