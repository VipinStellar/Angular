export class AppUtil {

    static _getPageAccess(assignedRole, type, url) {
        let res = assignedRole as any;
        let tmp = JSON.parse(res.assign);
        tmp = tmp[type];
        let test = JSON.stringify(tmp);
        if (url != undefined && url != null && url != '' && url != '/' && test.indexOf(url) !== -1) {
            return true
        }
        return false;
    }

    static getMediaTab()
    {
        return ['Case Details', 'Transfer Media','Pre Inspection','Inspection'];
    }

    static getTabUrl(name)
    {
        if(name == "Case Details")
        return "admin/case-details/";
        else if(name == "Pre Inspection")
        return "admin/pre-analysis/";
        else if(name == "Transfer Media")
        return "admin/transfer-media/";
        else if(name == "Inspection")
        return "admin/media-assessment/";
    }

    static getMediaType()
    {
        // return ['Desktop HDD','Laptop HDD','External HDD','SD Card','SSD','RAID Server','Working Android Phone',
        //         'Dead Android Phone','Working iPhone','Dead iPhone','Memory Card','DVR','Pen Drive','USB BOX',
        //         'NAS BOX','TAPE','CD/DVD','Floppy Drive','Flash Media','Other'];
        return ['Hard drive','SSD','Flash Media','Laptop Hard Drive','Desktop Hard Drive','External 2.5 Hard Drive','External 3.5 Hard Drive',
                'Tape Media','DVR Media','NVR Media','CD/DVD','RAID','FUSION IO DRIVES','FUSION DRIVES','Floppy Disk','On-board Flash Memory',
                'Drive attached to specialised machines','Mobile','Tablets','Other'];
    }
    

}