import { useState } from 'react';
import './watchForm.css';

const regTimezone1 = /^[+-\d]?$/;
const regTimezone2 = /^[+-]?\d{1,2}$/;

function WatchForm({ handleAdd }) {
  const formEmptyValue = { title: '', timezone: '' };
  const [form, setForm] = useState(formEmptyValue);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'timezone') {
      if (value.length === 1) {
        if (!regTimezone1.test(value)) return;
      } else if (value.length > 1) {
        if (!regTimezone2.test(value)) return;
      }
    }

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.title.length === 0 || form.timezone.length === 0) return;

    handleAdd({
      title: form.title,
      timezone: parseInt(form.timezone, 10),
    });

    setForm(formEmptyValue);
  }

  return (
    <form className={'watches__form form-watches'} onSubmit={handleSubmit}>
      <div className={'form-watches__body'}>
        <div className={'form-watches__column form-watches__column-1'}>
          <div className={'form-watches__item item-form-watches'}>
            <label className={'item-form-watches__title'} htmlFor={'watches-input-title'}>Название</label>
            <input
              className={'item-form-watches__input'}
              id={'watches-input-title'}
              name={'title'}
              value={form.title}
              onChange={handleChange} />
          </div>
        </div>

        <div className={'form-watches__column form-watches__column-2'}>
          <div className={'form-watches__item item-form-watches'}>
            <label className={'item-form-watches__title'} htmlFor={'watches-input-timezone'}>Временная зона</label>
            <input
              className={'item-form-watches__input'}
              id={'watches-input-timezone'}
              name={'timezone'}
              value={form.timezone}
              onChange={handleChange}
              placeholder={'Часовой пояс: от -12 до +14'} />
          </div>
        </div>

        <div className={'form-watches__column form-watches__column-3'}>
          <div className={'form-watches__item item-form-watches'}>
            <button className={'item-form-watches__btn'}>Добавить</button>
          </div>
        </div>
      </div>
    </form>
  )
}



export default WatchForm;