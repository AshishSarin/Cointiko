export const updateDemoState = () => {
    console.warn('updateDemoState called');
    return {
        type: 'UPDATE_DEMO',
        payload: 'DEM'
    }
}