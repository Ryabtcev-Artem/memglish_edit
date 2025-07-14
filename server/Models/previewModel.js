import mongoose, {Schema} from "mongoose";

const previewModel = new Schema({
  title: String,
  picture: String,
  downloadLink: String,
  level: String,
  description: String,
})
const Preview = mongoose.model('Previews', previewModel, 'Previews');

export {Preview}