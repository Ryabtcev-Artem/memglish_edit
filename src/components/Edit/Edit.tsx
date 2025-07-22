import type {IPreview} from "../../types/types.ts";
import "./Edit.scss"
import EditForm from "../EditForm/EditForm.tsx";
import useDelete from "../../hooks/useDelete.ts";

interface EditProps {
  currentPresentation: IPreview | null,
  setCurrentPresentation: (value: IPreview | null) => void
}

export default function Edit(props: EditProps) {
  const {currentPresentation, setCurrentPresentation} = props
  const isNewPreview = currentPresentation?._id === 'newPreview'

  function hideEditModal() {
    setCurrentPresentation(null)
    document.documentElement.classList.remove('stop-scroll')
  }

  const {mutate: deletePreview} = useDelete(`https://memglish-server.onrender.com/api/previews/${currentPresentation?._id}`, 'previews')

  async function handleDeletePreview() {
    const deleteConfirm = confirm("Вы точно уверены, что хотите полностью удалить презентацию?")
    if (deleteConfirm) {
      await deletePreview()
      setCurrentPresentation(null)
    }
  }

  return (
    <>
      {currentPresentation &&
        <div
          className={'edit'}
        >
          <div
            className="edit__content"
          >
            <div className="edit__buttons">
              {!isNewPreview && <button
                className="edit__delete"
                type="button"
                onClick={handleDeletePreview}
              >
                Удалить
              </button>
              }
              <button
                className="edit__hide"
                type="button"
                onClick={hideEditModal}
              >
                Закрыть
              </button>
            </div>
            <EditForm setCurrentPresentation={setCurrentPresentation} currentPresentation={currentPresentation} />
          </div>
        </div>
      }
    </>
  )
}