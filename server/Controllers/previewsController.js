import dotenv from "dotenv";
import {Preview} from '../Models/previewModel.js'

dotenv.config()

export const getPreviews = async (req, res) => {
  try {
    const previews = await Preview.find()
    res.json(previews)
  } catch (err) {
    console.log(err)
  }
}
export const createPreview = async (req, res) => {
  const userPreview = req.body
  try {
    const newPreview = await Preview.create(userPreview)
    res.json({
      status: 201,
      message: `Превью ${userPreview.title} было успешно добавлено`
    })
  } catch (err) {
    console.log(err)
  }
}

export const updatePreview = async (req, res) => {
  try {
    const {id} = req.params;
    const updates = req.body;

    const result = await Preview.updateOne(
      {_id: id},
      {$set: updates}
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({message: 'Превью не найдено'});
    }
    res.status(200).json({message: 'Превью успешно обновлено'});
  } catch (error) {
    console.error('Ошибка при обновлении превью:', error);
    res.status(500).json({error: 'Что-то пошло не так'});
  }
};

export const deletePreview = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Preview.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Не найдено' });
    }

    return res.status(200).json({ message: 'Удалено', deleted: result.deletedCount });
  } catch (err) {
    console.error('Ошибка при удалении:', err);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}
