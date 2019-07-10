/*******************************************************************************
* Copyright (c) 2019 IBM Corporation and others.
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v2.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v20.html
*
* Contributors:
*     IBM Corporation - initial API and implementation
*******************************************************************************/

import { FileChangeEventBatchUtil } from "./FileChangeEventBatchUtil";
import { FileWatcher } from "./FileWatcher";
import { ProjectToWatch } from "./ProjectToWatch";

import { IWatchService } from "./IWatchService";
import * as log from "./Logger";

export class ProjectObject {

    private _batchUtil: FileChangeEventBatchUtil;

    private _projectToWatch: ProjectToWatch;

    private readonly _watchService: IWatchService;

    public constructor(projectId: string, projectToWatch: ProjectToWatch, watchService: IWatchService,
                       parent: FileWatcher) {

            if (!projectId || !projectToWatch || !watchService || !parent) {
                log.severe("Missing parameters to constructor of ProjectObject!");
            }

            this._projectToWatch = projectToWatch;
            this._batchUtil = new FileChangeEventBatchUtil(projectId, parent);
            this._watchService = watchService;
    }

    public updateProjectToWatch(newProjectToWatch: ProjectToWatch) {
        const existingProjectToWatch = this._projectToWatch;

        if (existingProjectToWatch.pathToMonitor !== newProjectToWatch.pathToMonitor ) {

            const msg = "The pathToMonitor of a project cannot be changed once it is set, for a particular project id";

            log.severe(msg);
        }

        this._projectToWatch = newProjectToWatch;
    }

    public get projectToWatch(): ProjectToWatch {
        return this._projectToWatch;
    }

    public get batchUtil(): FileChangeEventBatchUtil {
        return this._batchUtil;
    }

    public get watchService(): IWatchService {
        return this._watchService;
    }
}
