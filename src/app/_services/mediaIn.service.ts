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

    getJobList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'job/joblist', searchParams);
    }

    getJobConfirm(searchParams: any) {
        return this.http.post(environment.apiUrl + 'job/jobconfirm', searchParams);
    }

    getMedia(id)
    {
        return this.http.get(environment.apiUrl + 'media/getmedia/'+id);
    }

    getObservation(id)
    {
        return this.http.get(environment.apiUrl + 'job/getObservation/'+id);
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

    changeJobStatus(data)
    {
        return this.http.post(environment.apiUrl + 'job/updateJobStatus', data);
    }

    getMediaJOb(id)
    {
        return this.http.get(environment.apiUrl + 'job/getmedia/'+id);
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

    deleteFile(id) {
        return this.http.get(environment.apiUrl + 'media/deleteFile/' + id);
    }

    updateObservation(data)
    {
        return this.http.post(environment.apiUrl + 'job/updateObservation', data);
    }

    getMediaStatusHistory(id)
    {
        return this.http.get(environment.apiUrl + 'job/getStatusHistory/'+id);
    }

    updateMediaStatus(data)
    {
        return this.http.post(environment.apiUrl + 'job/updateMediaStatus', data);
    }

    addDummyMedia(data)
    {
        return this.http.post(environment.apiUrl + 'media/addDummy', data);
    }

    updateDummyMedia(data)
    {
        return this.http.post(environment.apiUrl + 'media/updateDummy', data);
    }

    updateDummyStatus(id)
    {
        return this.http.get(environment.apiUrl + 'media/UpdateStausDummyMedia/'+id);
    }

    getGatepassList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'job/gatepasslist', searchParams);
    }

    saveGatePass(data)
    {
        return this.http.post(environment.apiUrl + 'job/addgatepass', data);
    }

}