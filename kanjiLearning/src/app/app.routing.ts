import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { Content1Component } from './content1/content1.component';
import { Content2Component } from './content2/content2.component';
import { Content3Component } from './content3/content3.component';

const routes: Routes = [
    { path: '', component: ContentComponent },
    { path: 'hirigana', component: Content1Component },
    { path: 'katakana', component: Content2Component },
    { path: 'kanji', component: Content3Component },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);