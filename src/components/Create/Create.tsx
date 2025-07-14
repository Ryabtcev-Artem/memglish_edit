import './Create.scss'
import {useCurrentPreviewStore} from "../../store/useCurrentPreviewStore.ts";
import {defaultPicturePreview} from "../../utils/consts.ts";
export default function Create() {
  const {setCurrentPresentation} = useCurrentPreviewStore.getState()
  function createNewPreview(){
    setCurrentPresentation({
      title: '',
      picture: defaultPicturePreview,
      description: '',
      _id: 'newPreview'}
    )
  }
  return (
    <>
      <button
        onClick={createNewPreview}
        type="button"
        className="btn-primary mb-4"
      >
        Создать новое превью
      </button>
    </>
  )
}