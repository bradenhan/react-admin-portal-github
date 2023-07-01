export const SidebarCollapsedReducers = (prevState = {
    isCollapsed: false
}, action) => { 
    switch (action.type) {
        case 'change_collapsed':
            let newState = {...prevState} // 注意这里
            newState.isCollapsed = !newState.isCollapsed
            return newState
        default:
            return prevState
    } 
};