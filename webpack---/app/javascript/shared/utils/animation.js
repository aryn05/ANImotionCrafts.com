// executes callback on the "next" repaint cycle (helpful for triggering css transitions via js)
export const onNextRepaint = (callback) => {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            callback();
        });
    });
};