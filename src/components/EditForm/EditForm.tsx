import type {IPreview, IPreviewNoID, level} from "../../types/types.ts";
import usePut from "../../hooks/usePut.ts";
import {type FormEvent, useRef} from "react";
import usePost from "../../hooks/usePost.ts";
import {defaultPicturePreview} from "../../utils/consts.ts";
interface EditFormProps {
  currentPresentation: IPreview;
  setCurrentPresentation: (value: IPreview | null) => void
}
export default function EditForm(props: EditFormProps ) {
  const {currentPresentation, setCurrentPresentation} = props
  const titleInput = useRef<HTMLInputElement | null>(null)
  const descriptionArea = useRef<HTMLTextAreaElement | null>(null)
  const imageInput = useRef<HTMLInputElement | null>(null)
  const levelSelect = useRef<HTMLSelectElement | null>(null)
  const {
    mutate: updatePreview,
    isPending,
    isSuccess,
    isError,
    error
  } = usePut(`http://localhost:5000/api/previews/${currentPresentation._id}`, 'previews')
  const isNewPreview = currentPresentation?._id === 'newPreview'
  const {mutate: createPreview} = usePost(`http://localhost:5000/api/previews`, 'previews')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      if (!titleInput.current || !descriptionArea.current || !imageInput.current || !levelSelect.current) {
        return
      }
      const formData: IPreviewNoID = {
        title: titleInput.current.value,
        description: descriptionArea.current.value,
        picture: imageInput.current.value || defaultPicturePreview,
        level: levelSelect.current.value as level,
      };
      if (isNewPreview) {
        createPreview(formData)
        setCurrentPresentation(null)
      } else {
        updatePreview(formData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  function saveText() {
    if (isNewPreview) {
      return 'Создать новую презентацию'
    } else if (isPending) {
      return "Сохраняется..."
    } else {
      return "Сохранить все изменения"
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="edit__form"
    >
      <div className={'edit__picture-container'}>
        <img
          className="edit__picture"
          src={currentPresentation.picture}
          alt="Фото для презентации"
          width="300"
          height="300"
          loading="lazy"
        />
      </div>
      <label
        className="edit__input"
        htmlFor="presentation-image"
      >
        <span>Фото для презентации</span>
        <input
          ref={imageInput}
          id="presentation-image"
          type="url"
          placeholder={'Введите URL изображения'}
          defaultValue={isNewPreview ? "" : currentPresentation.picture}
        />
      </label>

      <label
        className="edit__input"
        htmlFor="presentation-title"
      >
        <span>Название презентации</span>
        <input
          className="edit__title"
          id="presentation-title"
          ref={titleInput}
          defaultValue={currentPresentation.title}
          placeholder={'Введите название презентации'}
        />
      </label>

      <label
        className="edit__input"
        htmlFor="presentation-description"
      >
        <span>Описание презентации</span>
        <textarea
          className="edit__description"
          id="presentation-description"
          ref={descriptionArea}
          defaultValue={currentPresentation.description}
          placeholder={'Введите описание презентации'}
        />
      </label>
      <label
        className={"edit__level"}
        htmlFor="level"
      >
        <span>Уровень сложности</span>
        <select
          ref={levelSelect}
          name=""
          id="level"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Proficient">Proficient</option>
        </select>
      </label>

      <button
        type="submit"
        className="edit__save"
        disabled={isPending}
      >
        {saveText()}
      </button>

      {isSuccess && <span className={'ml-4'}>✅ Успешно обновлено</span>}
      {isError && <span className={'ml-4'}>❌ Ошибка: {String(error)}</span>}
    </form>
  );
}
