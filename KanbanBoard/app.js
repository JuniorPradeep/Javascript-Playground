import globalState from './models/state.js';
import RenderBoard from './views/board.js';

const renderFn = new RenderBoard('.drag-list');
globalState.addSubscriber(renderFn.render.bind(renderFn));
globalState.addColumn({ id: 'todo', title: "To DO", tasks: [] });
globalState.addColumn({ id: 'progress', title: "In Progress", tasks: [] });
globalState.addColumn({ id: 'Completed', title: "Completed", tasks: [] });