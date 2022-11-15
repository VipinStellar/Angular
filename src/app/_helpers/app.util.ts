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
        return {'mediaType':this.getMediaType(),'mediaClone':this.mediaClone(),'serviceType':this.getServiceType(),'serviceMode':this.getServiceMode(),'mediaSize':this.getMediaSize(),'mediaIferFace':this.getMediaInterFace(),'capacity':this.getMediaCapacity(),'condition':this.getmediaCondition(),'peripheralsMedia':this.getPeripheralsMedia(),'mediaStatus':this.getmediaStatus(),
                'media_make':this.getMediaMake(),'casetype':this.getMediaCaseType(),'recoveryPos':this.getMediaRecoveryPos(),'mediaDamage':this.getMediaDamage(),'plattersCondition':this.plattersCondition(),'tamperingRequired':this.getTamperingRequired(),'encryptionStatus':this.encryptionStatus(),'encryptionName':this.encryptionName(),'encryptionType':this.encryptionType(),'encryptionDetailsCorrect':this.encryptionDetailsCorrect(),
               'NoiceType':this.NoiceType(),'mediaRecevid':this.mediaRecevid(),'sparRequred':this.sparRequred(),'driveElectronic':this.driveElectronic(),'rotaryFunction':this.rotaryFunction(),'mediaOs':this.getMediaOs(),'compressionStatus':this.compressionStatus(),'furtherUse':this.furtherUse(),'recoverableData':this.recoverableData(),'dataLossReason':this.dataLossReason(),'fileSystemInfo':this.fileSystemInfo(),'serverType':this.serverType(),'recoveryPercentage':this.recoveryPercentage(),'requiredDays':this.requiredDays(),'assessmentDueReason':this.assessmentDueReason()};
    }

    static getMediaType()
    {
        return ['Hard Drive','External Hard Drive','Solid State Drive','Flash Media','External Solid State Drive',
                'Tape Media','DVR Media','NVR Media','CD/DVD','RAID','Floppy Disk','Fusion IO Drive','Fusion Drive','On-board Flash Memory',
                'Drive Attached to Specialised Machine','Mobile','Tablet','Other'];
    }

    static mediaRecevid()
    {
        return['With Laptop','Without Laptop'];
    }

    static recoveryPercentage()
    {
        return ['0-10%','10-20%','20-30%','30-40%','40-50%','50-60%','60-70%','70-80%','80-90%','90-100%','Not Determined at Present Stage','Not Applicable','Raw and With Structure'];
    }

    static mediaClone()
    {
        return['Yes','No','Not Aplicable'];
    }

    static assessmentDueReason()
    {
        return ['Waiting for Decryption Details','Client not Picking Call','Client Laptop Required','Waiting Tampering Permission for USB Casing','Clone Required for Assessment','Client Application/Software Required','Sample Data Required','Spare Required','Waiting  For Tempering Permission','Waiting For Original P.C.B.','Waiting For Similar Spare','Waiting For Original P.C.B./ Specific Chip','Water Logged HDD, Platter Cleaning In Process','Severe Corruption In Service Area Modules , Case Escalated To Research Team','Corruption In Specific CHIP/BIOS, Case Escalated To Research Team','Heads Found Broken, Spots & Scratches On Platter, Platter Cleaning In Process','Access Received, But Very-2 Slow Access Due To Spots & Scratches On Platter','Heavy-2  Scratches On Platter/surface, Trying To Get Access From Good Platter/surface','Burnt Hdd, Platter Cleaning In Process','Waiting for Proper Data Details','Other'];
    }

    static requiredDays()
    {
        return ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','Not Applicable'];
    }

    static NoiceType()
    {
        return ['Light Noise','Heavy Noise','No Movement','Normal Noise','Head Stuck Noise'];
    }
    static driveElectronic()
    {
        return ['Functional','Not Functional','Not Determined at Present Stage'];
    }

    static rotaryFunction()
    {
        return ['Normal','Not Determined at Present Stage'];
    }

    static serverType()
    {
        return ['JBOD','RAID0','RAID1','RAID10','RAID5','RAID50','RAID6','RAID60','SHR','Beyond RAID','Hybrid RAID','Multiple','Other'];
    }

    static recoverableData()
    {
        return ['Same as Original Files and Folder`s Structure','Data Recoverable Only in Raw form (Without Files & Folders Name)','Data Recoverable with File Names only but without Folder Names','Partial Data Recoverable With File Names and some Data in Raw Form (without files & Folders Name)','Not Determined at Present Stage','Not Applicable'];
    }

    static dataLossReason()
    {
        return ['Reinstalled Operating System','Deleted Data','Formatted Data','Overwritten Data','Over Encryption','Virus/Ransom ware','Others'];
    }

    static fileSystemInfo()
    {
        return ['File System Information Missing','File System Information Found Inconsistent','File System Information Found Corrupted','File System Information Found in ok State','Others'];
    }

    static compressionStatus()
    {
        return ['Compressed','Un Compressed','Not Applicable'];
    }

    static furtherUse()
    {
        return ['Not Possible','Possible'];
    }

    static getMediaOs()
    {
        return ['Windows','Linux','Unix','Mac','Virtual File System','Other'];
    }

    static getTamperingRequired()
    {
         return ['Yes','No','Already Tampered'];
    }
    static encryptionDetailsCorrect()
    {
        return ['Correct','Incorrect','Not Aplicable','Not Received at Present Stage','Not Determined  at Present Stage'];
    }

    static encryptionStatus()
    {
        return ['Yes','No','Not Determined at Present Stage'];
    }

    static encryptionName()
    {
        return ['BitLocker','McAfee Safeboot','Symantec PGP','Sophos','Trend Micro','Win Magic','Check Point','True Crypt','Windows File Encryption','Not Determined at Present Stage'];
    }

    static sparRequred()
    {
        return ['Received','Available in Stellar Inventory','Required From Customer','Not Required','Not Determined at Present Stage'];
    }

    static encryptionType()
    {
        return ['Hardware Encryption','Software Encryption','Not Determined at Present Stage'];
    }

    static getServiceType()
    {
        return ['Data Recovery','Cloning','Degaussing','Data Erasure/Wiping','Data Migration','Others'];
    }

    static getServiceMode()
    {
        return ['Onsite- Customer Site','Offsite-Stellar Lab','Remote-Online'];
    }

    static getMediaSize()
    {
       return {'Hard Drive':['2.5 in (Laptop Hard Drive)','3.5 in (Desktop Hard Drive)','1.8 in (Hard Drive)','Others'],'Flash Media':['SD Card','MSD Card','CF Card','Pen Drive','Others'],"Solid State Drive":['2.5 in Sata SSD','16*20 mm SSD','20*30 mm SSD','22*42 mm SSD','22*60 mm SSD','22*80 mm SSD','22*110 mm SSD','Others'],"Tape Media":['DSLR','SLR','DLT','DAT 20','DAT 40','DAT 160','DAT 320','LTO 1','LTO 2','LTO 3','LTO 4','LTO 5','LTO 6','LTO 7','LTO 8','LTO 9','Others'],"Mobile":['Apple','MI','Lava','Samsung','Micromax','One Plus','Google Pixel','Nokia','Oppo','Vivo','Huawei','Zte','Lenovo','HP','Others'],"Tablet":['Apple','MI','Lava','Samsung','Micromax','One Plus','Google Pixel','Nokia','Oppo','Vivo','Huawei','Zte','Lenovo','HP','Others'],"Other":['N/A','Others']}
    }

    static getMediaInterFace()
    {
        return ['SSD','PATA','SATA','SAS','SCSI','FC','USB','M.2','PCIe','NVMe','mSata','Others'];
    }

    static getMediaCapacity()
    {
        return ['Less than 1 GB','1 GB','2 GB','4 GB','8 GB','16 GB','32 GB','64 GB','Less than 80 GB','80 GB','128 GB','146 GB','250 GB','300 GB','320 GB','500 GB','600 GB','750 GB','800 GB','900 GB','1 TB','1.2 TB','1.5 TB','2 TB','3 TB +','4 TB','5 TB','6 TB','8 TB','10 TB','12 TB','14 TB','16 TB','18 TB','20 TB +','Others'];
    }

    static getmediaCondition()
    {
        return ['Non Tampered','Tampered','Casing Tampered Media Non Tampered','PCB Tampered','Broken','Burnt','PCB Burnt','Flooded','Flooded and Tampered','Burnt and Tampered','Other Tampered Conditions'];
    }

    static getPeripheralsMedia()
    {
        return ['With Storage Box','With Casing','Storage Box or Without Casing','Storage box','DAS/NAS/SAN With Bay','DAS/NAS/SAN Without Bay','Not aplicable'];
    }

    static getmediaStatus()
    {
        return ['Working','Non Working'];
    }
    
    static getMediaMake()
    {
        return ['Western Digital','Seagate','Toshiba','Hitachi','Samsung','Fujitsu','HP','IBM','Dell','Others'];
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
        return ['No External Damage Found','Damage Found'];
    }

    static plattersCondition()
    {
        return ['Heavy Light Scratches on Upper Side of the Platter','Heavy Light Scratches on Lower Side of the Platter','Normal','Not Determined at Present Stage'];
    }

    static CheckMediaTypeFields(mediaType)
    {
        if(mediaType != 'RAID' && mediaType != 'NVR Media' && mediaType != 'Fusion Drive' && mediaType != 'Fusion IO Drive')
        return true;
        else 
        return false;
    }


}