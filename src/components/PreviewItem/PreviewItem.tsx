import type {IPreview} from "../../types/types.ts";
interface PreviewItemProps {
  preview: IPreview;
  showEditModal: (value: IPreview) => void
}
export default function PreviewItem({preview,showEditModal}: PreviewItemProps) {

  return (
    <>
      <li
        className={'preview__item'}
        title={'Редактировать'}
        onClick={()=>showEditModal(preview)}
      >
        <div
          className={'preview__picture-container'}
        >
          <img
            className={'preview__picture'}
            src={preview.picture}
            alt=""
            width="200"
            height="200"
            loading="lazy"
          />
        </div>
        <h2 className={'preview__name'}>{preview.title}</h2>
        <p className={'preview__description'}>{preview.description}</p>
      </li>
    </>
  )
}