import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MediaInService {

    constructor(private http: HttpClient) { }

    getMediaInList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'media/medialist', searchParams);
    }

    getMedia(id)
    {
        return this.http.get(environment.apiUrl + 'media/getmedia/'+id);
    }

    getMediaDetails(id)
    {
        return this.http.get(environment.apiUrl + 'mediain/getMediaDetails/'+id);
    }

    mediaHistory(id,type,module)
    {
        return this.http.get(environment.apiUrl + 'media/mediaHistory/'+id+"/"+type+"/"+module);
    }

    mediauserlist(id)
    {
        return this.http.get(environment.apiUrl + 'media/mediauserlist/'+id);
    }

    updatePreAnalysis(data)
    {
        return this.http.post(environment.apiUrl + 'media/updatepreAnalysis', data);
    }

    changeMediaAssign(data)
    {
        return this.http.post(environment.apiUrl + 'media/changemediaAssign', data);
    }

    mediastatus(type)
    {
        return this.http.get(environment.apiUrl + 'media/mediastatus/'+type);
    }

    getAllBranch()
    {
        return this.http.get(environment.apiUrl + 'media/getAllBranch');
    }

    saveMediatransfer(data)
    {
        return this.http.post(environment.apiUrl + 'media/sendMediatransfer', data);
    }

    updateMediaAssessment(data)
    {
        return this.http.post(environment.apiUrl + 'media/updateMediaAssessment', data);
    }


    generateMediaCode(id)
    {
        return this.http.get(environment.apiUrl + 'media/generateMediaCode/'+id);
    }

    saveMediateam(data)
    {
        return this.http.post(environment.apiUrl + 'media/saveMediateam', data);
    }

}