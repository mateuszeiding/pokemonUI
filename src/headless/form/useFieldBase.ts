import { useId } from 'react';

export type useFieldBase<T> = {
    label: string;
    name?: string;
    helpText?: string;
    initialValue?: T;
    onChange?: (value: T) => void;
};

export default function useFieldBase<T>(props: useFieldBase<T>) {
    const id = useId();

    return { id, ...props };
}
