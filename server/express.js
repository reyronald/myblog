'use strict';

import express from 'express';
import path from 'path';
import config from './environment';

export default function(app) {
    const env = app.get('env');

    /*
     * Middleware here...
     */
     require('./config/authentication').default(app);

    // Pretty json output in developemnt mode
    if (env === 'development') {
        app.set('json spaces', 2);
    }
}