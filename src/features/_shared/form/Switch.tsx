import useFieldBase from '@headless/form/useFieldBase';

type Switch = PropsParams<typeof useFieldBase<boolean>>;

export default function Switch(props: Switch) {
    const { id, name, label, initialValue, onChange } = useFieldBase(props);

    return (
        <div className='form-check form-switch'>
            <input
                type='checkbox'
                className='form-check-input'
                id={id}
                name={name}
                defaultChecked={initialValue}
                onChange={(e) => onChange?.(e.target.checked)}
            />
            <label
                className='form-check-label'
                htmlFor={id}>
                {label}
            </label>
        </div>
    );
}
