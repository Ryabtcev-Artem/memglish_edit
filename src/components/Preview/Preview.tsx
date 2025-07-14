import './Preview.scss'
import useGet from "../../hooks/useGet.ts";
import Edit from "../Edit/Edit.tsx";
import type {IPreview} from "../../types/types.ts";
import PreviewItem from "../PreviewItem/PreviewItem.tsx";
import {useCurrentPreviewStore} from "../../store/useCurrentPreviewStore.ts";
import Create from "../Create/Create.tsx";


export default function Preview() {
  const { currentPresentation, setCurrentPresentation } = useCurrentPreviewStore();
  const {
    previews,
    isLoading,
    error
  } = useGet('http://localhost:5000/api/previews', 'previews')

  function showEditModal(preview: IPreview) {
    document.documentElement.classList.add('stop-scroll')
    setCurrentPresentation(preview)
  }

  return (
    <section
      className="preview main-wrapper"
    >
      <Edit
        setCurrentPresentation={setCurrentPresentation}
        currentPresentation={currentPresentation}
      />
      <h2 className={'preview__title'}>Все превью</h2>
      <Create />
      {isLoading &&
        <div className={'preview__download-wrapper'}>
          <h3 className={'preview__download-title'}>Загрузка презентаций...</h3>
          <div className={'preview__download'}></div>
        </div>
      }
      {error && <h2>{error.message}</h2>}
      {previews && (
        <ul
          onClick={() => showEditModal}
          className={'preview__list'}>
          {
            previews.map((preview:IPreview) => {
              return (
                <PreviewItem showEditModal={showEditModal} key={preview._id} preview={preview} />
               )
            })
          }
        </ul>
        )}
    </section>
  )
}