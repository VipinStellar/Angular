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

    static getMediaDeatils()
    {
        return {'mediaType':this.getMediaType(),'serviceType':this.getServiceType(),'serviceMode':this.getServiceMode(),'mediaSize':this.getMediaSize(),'mediaIferFace':this.getMediaInterFace(),'capacity':this.getMediaCapacity(),'condition':this.getmediaCondition(),'peripheralsMedia':this.getPeripheralsMedia(),'mediaStatus':this.getmediaStatus(),
                'media_make':this.getMediaMake(),'casetype':this.getMediaCaseType(),'recoveryPos':this.getMediaRecoveryPos(),'mediaDamage':this.getMediaDamage(),'plattersCondition':this.plattersCondition(),'tamperingRequired':this.getTamperingRequired(),'encryptionStatus':this.encryptionStatus(),'encryptionType':this.encryptionType(),'encryptionDetailsCorrect':this.encryptionDetailsCorrect(),
               'mediaOs':this.getMediaOs(),'compressionStatus':this.compressionStatus(),'furtherUse':this.furtherUse(),'recoverableData':this.recoverableData(),'dataLossReason':this.dataLossReason(),'fileSystemInfo':this.fileSystemInfo(),'serverType':this.serverType(),'recoveryPercentage':this.recoveryPercentage(),'requiredDays':this.requiredDays(),'assessmentDueReason':this.assessmentDueReason()};
    }

    static getMediaType()
    {
        return ['Hard drive','External Hard drives','Solid Satate Drive','Flash Media',
                'Tape Media','DVR Media','NVR Media','CD/DVD','RAID','Floppy Disk','FUSION IO DRIVES','FUSION DRIVES','On-board Flash Memory',
                'Drive attached to specialised machines','Mobile','Tablets','Other'];
    }

    static recoveryPercentage()
    {
        return ['30%','40%','50%','60%','70%','80%','90%','100%','Undetermined','Recovery without File Name'];
    }

    static assessmentDueReason()
    {
        return ['Waiting for Decryption Details','Client not Picking Call','Client Laptop Required','Waiting Tampering Permission for USB Casing','Clone Required for Assessment','Client Application/Software Required','Sample Data Required','Spare required','Waiting  For Tempering Permission','Waiting For Original P.C.B.','Waiting For Similar Spare','Waiting For Original P.C.B./ Specific Chip','Water Logged HDD, Platter Cleaning In Process','Severe Corruption In Service Area Modules , Case Escalated To Research Team','Corruption In Specific CHIP/BIOS, Case Escalated To Research Team','Heads Found Broken, Spots & Scratches On Platter, Platter Cleaning In Process','Access Received, But Very-2 Slow Access Due To Spots & Scratches On Platter','Heavy-2  Scratches On Platter/surface, Trying To Get Access From Good Platter/surface','Burnt Hdd, Platter Cleaning In Process','Other'];
    }

    static requiredDays()
    {
        return ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
    }

    static serverType()
    {
        return ['JBOD','Raid0','Raid1','Raid10','Raid5','Raid50','Raid6','Raid60','Other'];
    }

    static recoverableData()
    {
        return ['Same as original files and folder`s structure','Data recoverable only in Raw form (without files & folders name)','Data recoverable with file names only but without folder names','Partial data recoverable with file names and some data in Raw form (without files & folders name)','Not determined at present stage','Not applicable'];
    }

    static dataLossReason()
    {
        return ['Reinstalled Operating system','Deleted data','Formatted data','Overwritten data','Over encryption','Virus Attack','Others'];
    }

    static fileSystemInfo()
    {
        return ['File system information missing','File system information found inconsistent','File system information found corrupted','File system information found in ok state','Others'];
    }

    static compressionStatus()
    {
        return ['Compressed','Un-compressed','Not applicable'];
    }

    static furtherUse()
    {
        return ['Not Possible','Possible'];
    }

    static getMediaOs()
    {
        return ['Windows','Mac OS','LINUX','UNIX','HP Unix','Other'];
    }

    static getTamperingRequired()
    {
         return ['Yes','No','Already Tampered'];
    }
    static encryptionDetailsCorrect()
    {
        return ['Yes','No','Not aplicable'];
    }
    static encryptionStatus()
    {
        return ['Yes','No','Not determined at present stage'];
    }

    static encryptionType()
    {
        return ['Hardware','Software','Not determined at present stage'];
    }

    static getServiceType()
    {
        return ['Data Recovery','Cloning','Degaussing','Data erasure/wiping','Others'];
    }

    static getServiceMode()
    {
        return ['Onsite- Customer Site','Offsite-Stellar Lab','Remote-Online'];
    }

    static getMediaSize()
    {
        return ['2.5 (Laptop hard drives)','3.5 (Desktop hard drives)','22*30','22*42','1.8','N/A'];
    }

    static getMediaInterFace()
    {
        return ['PATA','SATA','SAS','SCSI','FC','USB','M.2','PCIe','NVMe','mSata','Others'];
    }

    static getMediaCapacity()
    {
        return ['less than 1 GB','1 GB','2 GB','4 GB','8 GB','16 GB','32 GB','64 GB','Less than 80 GB','80 GB','128 GB','146 GB','250 GB','300 GB','320 GB','500 GB','600 GB','750 GB','800 GB','900 GB','1 TB','1.2 TB','1.5 TB','2 TB','3 TB +','4 TB','5 TB','6 TB','8 TB','10 TB','12 TB','14 TB','16 TB','18 TB','20 TB +','Others'];
    }

    static getmediaCondition()
    {
        return ['Non Tampered','Tampered','PCB Tampered','Broken','Burnt','PCB Burnt','Flooded','Flooded and Tampered','Burnt and Tampered','Other Tampered Conditions'];
    }

    static getPeripheralsMedia()
    {
        return ['With storage box','With casing','Storage box or without casing','Storage box','DAS/NAS/SAN With bay','DAS/NAS/SAN without bay','Not aplicable'];
    }

    static getmediaStatus()
    {
        return ['Working','Non-working'];
    }
    
    static getMediaMake()
    {
        return ['Western digital','Seagate','Toshiba','Hitachi','Samsung','Others'];
    }

    static getMediaCaseType()
    {
        return ['Logical','Logical Complex','Physical','Physical Complex','Logical Cum Physical'];
    }

    static getMediaRecoveryPos()
    {
        return ['Yes','No'];
    }

    static getMediaDamage()
    {
        return ['No external damage found','Damage found'];
    }

    static plattersCondition()
    {
        return ['Heavy','Light scratches on upper side of the platter','Light scratches on lower side of the platter','Normal','Not determined at present stage'];
    }

}