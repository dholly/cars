
export function usePositionFixed(elementRef) {
    const fixedStyles = ref({});
    const fixPosition = () => {
        if (!elementRef.value) return;
        const rect = elementRef.value.getBoundingClientRect();
        fixedStyles.value = {
            position: 'fixed',
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            'min-width':0,
            zIndex: 1000,
        };
    };

    const unfixPosition = ()=>{
        fixedStyles.value = {};
    }

    return {
        fixedStyles,
        fixPosition,
        unfixPosition,
    };
}