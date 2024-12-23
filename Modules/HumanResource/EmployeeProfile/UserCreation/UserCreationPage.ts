import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { UserCreationGrid } from './UserCreationGrid';

export default function pageInit() {
    initFullHeightGridPage(new UserCreationGrid($('#GridDiv')).element);
}