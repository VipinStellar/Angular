import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MediaService {

    constructor(private http: HttpClient) { }

    getMediaInList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'media/medialist', searchParams);
    }

    getMedia(mediaId)
    {
        return this.http.get(environment.apiUrl + 'media/getmedia/'+mediaId);
    }

    getOriginalMedia(mediaId)
    {
        return this.http.get(environment.apiUrl + 'media/original-media/'+mediaId);
    }

    getTransferHistory(mediaId)
    {
        return this.http.get(environment.apiUrl + 'media/transfer-history/'+mediaId);
    }

    mediaHistory(mediaId)
    {
        return this.http.get(environment.apiUrl + 'media/all-history/'+mediaId);
    }

    deptUser(teamid,mediaId)
    {
        return this.http.get(environment.apiUrl + 'media/dept-user/'+teamid+'/'+mediaId);
    }

    updateAllotJob(data)
    {
        return this.http.post(environment.apiUrl + 'media/update-allot-job', data);
    }

    getJobList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'job/joblist', searchParams);
    }

    getJobConfirm(searchParams: any) {
        return this.http.post(environment.apiUrl + 'job/jobconfirm', searchParams);
    }

    getObservation(id)
    {
        return this.http.get(environment.apiUrl + 'job/getObservation/'+id);
    }

    getMediaDetails(id)
    {
        return this.http.get(environment.apiUrl + 'mediain/getMediaDetails/'+id);
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

    gettransferbranch()
    {
        return this.http.get(environment.apiUrl + 'media/transfer-branch');
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

    getGatepassList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'job/gatepasslist', searchParams);
    }

    saveGatePass(data)
    {
        return this.http.post(environment.apiUrl + 'job/addgatepass', data);
    }

    updateGatePassRef(data)
    {
        return this.http.post(environment.apiUrl + 'media/updateGatePassRef', data);
    }

    getObvertationDetails(id)
    {
        return this.http.get(environment.apiUrl + 'job/obvertation-details/'+id);
    }

    getCommanHistory(id)
    {
        return this.http.get(environment.apiUrl + 'media/comman-history/'+id);
    }

    updateMediaDl(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/update-media-dl', data);
    }

    getMediaOutList(searchParams: any) {
        return this.http.post(environment.apiUrl + 'media/mediaoutlist', searchParams);
    }

    dataout(data)
    {
        return this.http.post(environment.apiUrl + 'media/data-out', data);
    }

    requsetmediaout(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/requsetmediaout', data);
    }

    responcemediaout(data)
    {
        return this.http.post(environment.apiUrl + 'recovery/responcemediaout', data);
    }

    wipinglist(searchParams: any) {
        return this.http.post(environment.apiUrl + 'job/wiping-list', searchParams);
    }

    requestWiping(mediaId)
    {
        return this.http.get(environment.apiUrl + 'job/request-wiping/'+mediaId);
    }

    updateWipeStatus(data)
    {
        return this.http.post(environment.apiUrl + 'job/update-wipe-status', data);
    }

    wipingduelist(searchParams: any) {
        return this.http.post(environment.apiUrl + 'job/wiping-due-list', searchParams);
    }
    

}