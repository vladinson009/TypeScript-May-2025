import './style.css';
import { app } from './app';
const root = document.getElementById('app') as HTMLDivElement;

root.replaceChildren(app);
