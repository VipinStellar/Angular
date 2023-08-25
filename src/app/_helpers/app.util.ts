export class AppUtil {

    static MediaTab()
    {
        return [{'name':'Case Details','url':'view'},
                {'name':'Assign Job','url':'allot-job'},{'name':'Job Process','url':'job-process'},
                {'name':'Media Daily Status','url':'daily-status'},{'name':'Transfer Media','url':'transfer-media'}];
    }


    static getMediaDeatils()
    {
        return {'mediaType':this.getMediaType(),'mediaClone':this.mediaClone(),'serviceType':this.getServiceType(),'serviceMode':this.getServiceMode(),'mediaSize':this.getMediaSize(),'mediaIferFace':this.getMediaInterFace(),'capacity':this.getMediaCapacity(),'condition':this.getmediaCondition(),'peripheralsMedia':this.getPeripheralsMedia(),'mediaStatus':this.getmediaStatus(),
                'media_make':this.getMediaMake(),'casetype':this.getMediaCaseType(),'recoveryPos':this.getMediaRecoveryPos(),'mediaDamage':this.getMediaDamage(),'plattersCondition':this.plattersCondition(),'tamperingRequired':this.getTamperingRequired(),'encryptionStatus':this.encryptionStatus(),'encryptionName':this.encryptionName(),'encryptionType':this.encryptionType(),
                'encryptionDetailsCorrect':this.encryptionDetailsCorrect(),'NoiceType':this.NoiceType(),'mediaRecevid':this.mediaRecevid(),'sparRequred':this.sparRequred(),'driveElectronic':this.driveElectronic(),'rotaryFunction':this.rotaryFunction(),'mediaOs':this.getMediaOs(),'compressionStatus':this.compressionStatus(),'furtherUse':this.furtherUse(),
                'recoverableData':this.recoverableData(),'dataLossReason':this.dataLossReason(),'fileSystemInfo':this.fileSystemInfo(),'serverType':this.serverType(),'recoveryPercentage':this.recoveryPercentage(),'requiredDays':this.requiredDays(),'backupUtility':this.backupUtility(),'tapeDamage':this.tapeDamage(),'plattersCount':this.plattersCount(),'HeadCount':this.HeadCount(),'SSDInterFace':this.SSDInterFace()};
    }

    static getMediaType()
    {
        return ['Hard Drive','External Hard Drive','Solid State Drive','External Solid State Drive','Flash Media',
                'Tape Stand Alone','Tape Library','DVR Media','NVR Media','CD/DVD','RAID','Floppy Disk','Fusion IO Drive',
                'Fusion Drive','On-board Flash Memory','Drive Attached to Specialised Machine','Mobile','Tablet','Other'];
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
        return['Yes','No','Not Applicable'];
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
        return ['Windows','Linux','Unix','Mac','Virtual OS','Other'];
    }

    static getTamperingRequired()
    {
         return ['Yes','No','Already Tampered'];
    }
    static encryptionDetailsCorrect()
    {
        return ['Correct','Incorrect','Not Applicable','Not Received at Present Stage','Not Determined  at Present Stage'];
    }

    static encryptionStatus()
    {
        return ['Yes','No','Not Determined at Present Stage'];
    }

    static encryptionName()
    {
        return ['BitLocker','McAfee Safeboot','Symantec PGP','Sophos','Trend Micro','Win Magic','Check Point','True Crypt','Windows File Encryption','Unknown','Not Determined at Present Stage','Other'];
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
       return {'Hard Drive':['2.5 inch (Laptop Hard Drive)','3.5 inch (Desktop Hard Drive)','1.8 inch (Hard Drive)','Others'],'Flash Media':['SD Card','MSD Card','CF Card','Pen Drive','Others'],"Solid State Drive":['2.5 in Sata SSD','16*20 mm SSD','20*30 mm SSD','22*42 mm SSD','22*60 mm SSD','22*80 mm SSD','22*110 mm SSD','Others'],"Tape Stand Alone":['DSLR','SLR','DLT','DAT 20','DAT 40','DAT 160','DAT 320','LTO 1','LTO 2','LTO 3','LTO 4','LTO 5','LTO 6','LTO 7','LTO 8','LTO 9','Others'],"Mobile":['Apple','MI','Lava','Samsung','Micromax','One Plus','Google Pixel','Nokia','Oppo','Vivo','Huawei','Zte','Lenovo','HP','Others'],"Tablet":['Apple','MI','Lava','Samsung','Micromax','One Plus','Google Pixel','Nokia','Oppo','Vivo','Huawei','Zte','Lenovo','HP','Others'],"Other":['N/A','Others']}
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
        return ['Not Applicable','With Storage Box','With Casing','Storage Box  Without Casing','Storage box','DAS/NAS/SAN With Bay','DAS/NAS/SAN Without Bay','With Tape Drive','Without Tape Drive'];
    }

    static getmediaStatus()
    {
        return ['Working','Non Working'];
    }
    
    static getMediaMake()
    {
        return ['Western Digital','Seagate','Toshiba','Hitachi','Samsung','Fujitsu','HP','IBM','Dell','3M','Sony','Imation','Others'];
    }

    static getMediaCaseType()
    {
        return ['Logical','Logical Complex','Most Complex','Physical','Physical Complex'];
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
        return ['Heavy Scratches on Upper Side of the Platter','Light Scratches on Upper Side of the Platter','Heavy Scratches on Lower Side of the Platter','Light Scratches on Lower Side of the Platter','Normal','Not Determined at Present Stage'];
    }

    static backupUtility()
    {
        return ['Inbuilt O.S Utility','Thirdparty Utility'];
    }

    static tapeDamage()
    {
        return ['Entangled/Folded Tape Ribbon','Internal Cartridge Mechanism Failure','Broken/Brunt/Flooded/Tampered','Dust Chemical or Moisture in Tape','Other'];
    }

    static CheckMediaTypeFields(mediaType)
    {
        if(mediaType != 'RAID' && mediaType != 'NVR Media' && mediaType != 'Fusion Drive' && mediaType != 'Fusion IO Drive' &&  mediaType != 'Tape Library')
        return true;
        else 
        return false;
    }

    static plattersCount()
    {
        return [1,2,3,4,5,6,7,8,9,'N/A','Other'];
    }

    static HeadCount()
    {
        return [0,1,2,3,4,5,6,7,8,9,'N/A','Other'];
    }

    static SSDInterFace()
    {
        return ['SATA','SATA M.2','NVME(M.2)','U.2 ACHI','muSATA','PCIe EXPRESS','USB/Onborad','Other'];
    }

    static mediaStausList()
    {
        return ['Tempering Permission Required','Waiting  For Tempering Permission','Waiting For Confirmation','Required/ Waiting For  Original P.C.B/specific Chip (Bios)/missing Specific Chip (Bios)','In Analysis Process,________working Days Required',
                'Sample Image Done , Given To Logical Lab For Further Analysis','Looking For Spare /P.C.B.','Access Lost, Trying To Get Access Again','No Access Yet,Heads Found Broken,Spots & Scratches On Platter','No Access Yet , Heads Ribbon Cable Found Burnt , Smoke Layer Found On The Platter','P.C.B. Found Burnt',
                'P.C.B. Connector Found Broken','Access Received , There Are ____ Platters And  _______ Heads In The Hdd','Water Logged Hdd , Platter Cleaning In Process, _____ Days Extension Required','Burnt Hdd , Platter Cleaning In Process , _______ Days Extension Required','Access Received , Image Just Started, Very-2 Slow Access Due To Surface Problem',
                'Given To Pc-3k For Firmware Repairing /P.C.B. Checking/ Imaging','Corruption  In Specific Chip , Looking For Solution',' _______sectors Image Done  With _______  Heads, Total _____ Heads','Waiting For Original  P.C.B. / Specific Chip, Recovery Not Possible Without Original   P.C.B./bios','Severe  Corruption In Service Area Modules, Case  Escalated To Research Team','Corruption In Specific Chip /bios , Case  Escalated To Research Team'];
    }

    static getObjtoId(obj,fieldName)
    {
        let id =[] as any;
        obj.forEach((element) => {
            id.push(element[fieldName]);
        });
        return id;
    }

    

    static checkMediaType(media_type){
        if(media_type == 'Hard Drive' || media_type == 'External Hard Drive'){
            media_type = 'Hard Drive';
        }else if(media_type == 'Solid State Drive' || media_type == 'External Solid State Drive'){
            media_type = 'Solid State Drive';
        }else if(media_type == 'Flash Media'){
            media_type = 'Flash Media';
        }else if(media_type == 'Tape Stand Alone' || media_type == 'Tape Library'){
            media_type = 'Tapes';
        }else if(media_type == 'CD/DVD'){
            media_type = 'CD/DVD';
        }else if(media_type == 'RAID'){
            media_type = 'RAID';
        }else{
            media_type='Other';
        }
        return media_type;
    }

    static InspectionDueReason(media_type){
        let inspectionDue = {
            "Hard Drive":["Waiting For Tampering Permission","Waiting For Original P.C.B.","Waiting For Similar Spare.","Waiting For Original P.C.B./ Specific Chip.","Water Logged Hard drive, Platter Cleaning In Process.","Severe Corruption In Service Area Modules , Case Escalated To Research Team.","Corruption In Specific Chip/Bios, Case Escalated To Research Team.",
        "Heads Found Broken, Spots & Scratches On Platter, Platter Cleaning In Process.","Head Ribbon Cable Found Burnt, Smoke Layer Found On The Platter, Platter Cleaning In Process.","Access Received, Very Slow Access Due To Spots & Scratches On Platter.","Heavy Scratches On Platter/Surface, Trying To Get Access From Good Platter/Surface.",
        "Burnt Hdd, Platter Cleaning In Process.","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client's Laptop","Waiting For Tampering Permission Of USB Casing","Clone Required For Assessment","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client",
        "Files Severely Damaged, Case Escalated to Reasearch Team","Scanning Slow due to Bad Sectors"],
            "Solid State Drive":["Waiting For Tampering Permission","Severe Corruption In Service Area Modules , Case Escalated To Research Team.","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client's Laptop","Clone Required For Assessment","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client",
        "Files Severely Damaged, Case Escalated to Reasearch Team","Slow cloning/imaging due to lot of bad sector in Nand Data Chip"],
            "Flash Media":["Waiting For Tampering Permission","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client","Files Severely Damaged, Case Escalated to Reasearch Team",
        "Access Received, Very Slow Access Due To lots of bit error and bad block in the chip","Unknown Pinout, trying for solution","Unknown XOR, trying to decrypt","Finding solution for Non-standerd chip","Broken/tampered chip, trying to get access"],
            "Tapes":["Waiting For Tampering Permission","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client","Files Severely Damaged, Case Escalated to Reasearch Team"],
            "CD/DVD":["Waiting for client's response","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client","CD/DVD reading under process"],
            "RAID":["Waiting For Tampering Permission","Waiting For Original P.C.B.","Waiting For Similar Spare.","Waiting For Original P.C.B./ Specific Chip.","Water Logged Hard drive, Platter Cleaning In Process.","Severe Corruption In Service Area Modules , Case Escalated To Research Team.","Corruption In Specific Chip/Bios, Case Escalated To Research Team.",
        "Heads Found Broken, Spots & Scratches On Platter, Platter Cleaning In Process.","Head Ribbon Cable Found Burnt, Smoke Layer Found On The Platter, Platter Cleaning In Process.","Access Received, Very Slow Access Due To Spots & Scratches On Platter.","Heavy Scratches On Platter/Surface, Trying To Get Access From Good Platter/Surface.",
        "Burnt Hdd, Platter Cleaning In Process.","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client","Files Severely Damaged, Case Escalated to Reasearch Team","Scanning Slow due to Bad Sectors"],
            "Other":["Waiting For Tampering Permission","Waiting For Original P.C.B.","Waiting For Similar Spare.","Waiting For Original P.C.B./ Specific Chip.","Water Logged Hard drive, Platter Cleaning In Process.","Severe Corruption In Service Area Modules , Case Escalated To Research Team.","Corruption In Specific Chip/Bios, Case Escalated To Research Team.",
        "Heads Found Broken, Spots & Scratches On Platter, Platter Cleaning In Process.","Head Ribbon Cable Found Burnt, Smoke Layer Found On The Platter, Platter Cleaning In Process.","Access Received, Very Slow Access Due To Spots & Scratches On Platter.","Heavy Scratches On Platter/Surface, Trying To Get Access From Good Platter/Surface.",
        "Burnt Hdd, Platter Cleaning In Process.","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client's Laptop","Waiting For Tampering Permission Of USB Casing","Clone Required For Assessment","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client",
        "Files Severely Damaged, Case Escalated to Reasearch Team","Scanning Slow due to Bad Sectors","Access Received, Very Slow Access Due To lots of bit error and bad block in the chip","Unknown Pinout, trying for solution","Unknown XOR, trying to decrypt","Finding solution for Non-standerd chip","Broken/tampered chip, trying to get access","Tally sample data required",
        "Tally transaction & Manager files severely damaged","MDF file severely damaged","Busy sample data required","Busy files severely damaged","MDF/BAK sample data required","MDF/BAK file scanning under process due to size of file big","Try to repair MDF file table structure","MDF file repair process slow due to huge number of record inside tables",
        "Advanced scanning under Process due to metadata damaged","Searching for metadata entries","Metadata entries are missing advance scanning under process","Decryption under process","Decryption details provided by client mismatch, waiting for correct details","Mail File repairing under process","DVR scanning under process","Video file repairing under process",
        "Video sample file required","Photos repairing under process","Excle file password recovery under process","Word file password recovery under process","CD/DVD reading under process","Zip/Rar file partially damaged repairing under process"]
        };
        return inspectionDue[media_type];
    }

    static RecoveryDue(media_type){
        let recoveryReason = {
                "Hard Drive":["Waiting For Tampering Permission","Waiting For Original P.C.B.","Waiting For Similar Spare","Waiting For Original P.C.B./ Specific Chip","Water Logged Hard drive, Platter Cleaning In Process","Severe Corruption In Service Area Modules , Case Escalated To Research Team","Corruption In Specific Chip/Bios, Case Escalated To Research Team",
            "Heads Found Broken, Spots & Scratches On Platter, Platter Cleaning In Process","Head Ribbon Cable Found Burnt, Smoke Layer Found On The Platter, Platter Cleaning In Process","Access Received, Very Slow Access Due To Spots & Scratches On Platter","Heavy Scratches On Platter/Surface, Trying To Get Access From Good Platter/Surface",
            "Burnt Hdd, Platter Cleaning In Process","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client’s Laptop","Waiting For Tampering Permission Of USB Casing","Clone Required For Assessment","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client",
            "Files Severely Damaged, Case Escalated to Reasearch Team","Scanning Slow due to Bad Sectors","File Severely Damaged, Case Escalated to Reasearch Team"],
                "Solid State Drive":["Waiting For Tampering Permission","Severe Corruption In Service Area Modules , Case Escalated To Research Team","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client’s Laptop","Clone Required For Assessment","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client",
            "Files Severely Damaged, Case Escalated to Reasearch Team","Slow cloning/imaging due to lot of bad sector in Nand Data Chip"],
                "Flash Media":["Waiting For Tampering Permission","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client","Files Severely Damaged, Case Escalated to Reasearch Team","Access Received, Very Slow Access Due To lots of bit error and bad block in the chip",
            "Unknown Pinout, trying for solution","Unknown XOR, trying to decrypt","Finding solution for Non-standerd chip","Broken/tampered chip, trying to get access"],
                "Tapes":["Waiting For Tampering Permission","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client","Files Severely Damaged, Case Escalated to Reasearch Team"],
                "CD/DVD":["Waiting for client's response","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client"],
                "RAID":["Waiting For Tampering Permission","Waiting For Original P.C.B.","Waiting For Similar Spare","Waiting For Original P.C.B./ Specific Chip","Water Logged Hard drive, Platter Cleaning In Process","Severe Corruption In Service Area Modules , Case Escalated To Research Team","Corruption In Specific Chip/Bios, Case Escalated To Research Team","Heads Found Broken, Spots & Scratches On Platter, Platter Cleaning In Process",
            "Head Ribbon Cable Found Burnt, Smoke Layer Found On The Platter, Platter Cleaning In Process","Access Received, Very Slow Access Due To Spots & Scratches On Platter","Heavy Scratches On Platter/Surface, Trying To Get Access From Good Platter/Surface","Burnt Hdd, Platter Cleaning In Process","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client’s Application/Software",
            "Waiting For Sample Data","Waiting For Important Data Details From Client","Files Severely Damaged, Case Escalated to Reasearch Team","Scanning Slow due to Bad Sectors","File Severely Damaged, Case Escalated to Reasearch Team"],
                "Other":["Waiting For Tampering Permission","Waiting For Original P.C.B.","Waiting For Similar Spare","Waiting For Original P.C.B./ Specific Chip","Water Logged Hard drive, Platter Cleaning In Process","Severe Corruption In Service Area Modules , Case Escalated To Research Team","Corruption In Specific Chip/Bios, Case Escalated To Research Team",
            "Heads Found Broken, Spots & Scratches On Platter, Platter Cleaning In Process","Head Ribbon Cable Found Burnt, Smoke Layer Found On The Platter, Platter Cleaning In Process","Access Received, Very Slow Access Due To Spots & Scratches On Platter","Heavy Scratches On Platter/Surface, Trying To Get Access From Good Platter/Surface",
            "Burnt Hdd, Platter Cleaning In Process","Waiting For Decryption Details from client","Waiting for client's response","Waiting For Client’s Laptop","Waiting For Tampering Permission Of USB Casing","Clone Required For Assessment","Waiting For Client’s Application/Software","Waiting For Sample Data","Waiting For Important Data Details From Client",
            "Files Severely Damaged, Case Escalated to Reasearch Team","Scanning Slow due to Bad Sectors","Slow cloning/imaging due to lot of bad sector in Nand Data Chip","Access Received, Very Slow Access Due To lots of bit error and bad block in the chip","Unknown Pinout, trying for solution","Unknown XOR, trying to decrypt","Finding solution for Non-standerd chip","Broken/tampered chip, trying to get access","Recovery Under Process",
            "Tally transaction & Manager files severely damaged need extention required","MDF file severely damaged need extention required","Busy files severely damaged need extention required","MDF file scanning under process due to size of file big",
            "Trying to repair MDF file table structure","MDF file repair process slow due to huge number of record inside tables","Advanced scanning under Process due to meta Data damaged","Searching for metadata entries","Metadata entries are missing advance scanning under process","Decryption under process","Decryption details provided by client mismatch, waiting for correct details",
            "Mail file repairing under process","DVR recovery under process"]
        }
        return recoveryReason[media_type];
    }

    static StatusRecovery(media_type){
        let statusReason = {
                "Hard Drive":["Tampering Permission Required","Waiting For Tampering Permission","Waiting For Original PCB/specific Chip (Bios)","Waiting For Missing Specific Chip (Bios)","In Analysis Process,________working Days Required","Sample Image/clone Done, Given To Logical Lab For Further Analysis",
            "Looking for Similar Spare","Access Lost, Trying To Get Access Again","No Access Yet,Heads Found Broken,Spots & Scratches On Platter","No Access Yet , Heads Ribbon Cable Found Burnt , Smoke Layer Found On The Platter","PCB Found Burnt","PCB Connector Found Broken",
            "Access Received , There are ____ Platters and _______ Heads In The Hdd","Water Logged Hdd , Platter Cleaning In Process, _____ Days Extension Required","Burnt Hdd , Platter Cleaning In Process , _______ Days Extension Required","Access Received , Clone Just Started, Very Slow Access Due To Surface Problem",
            "Given To PC-3K For Firmware Repairing","Given To PC-3K For P.C.B. Checking","Given to PC-3K For cloning","Corruption In Specific Chip , Looking For Solution","_______sectors Clone Done With _______ Heads, Total _____ Heads","Waiting For Original PCB / Specific Chip, Recovery Not Possible Without Original PCB/bios",
            "Severe Corruption In Service Area Modules, Case Escalated To Research Team","Corruption In Specific Chip /bios , Case Escalated To Research Team","_______sectors Image Done With _______ Heads, Total _____ Heads","#NAME?","No access yet, trying to get access","No access, needs ____to_____   working days’ time extension",
            "Advanced scanning of media is started","Data recovery is completed"],
                "Solid State Drive":["Tampering Permission Required","Waiting For Tampering Permission","In Analysis Process,________working Days Required","Sample Image/clone Done, Given To Logical Lab For Further Analysis","Looking for Similar Spare","Access Lost, Trying To Get Access Again","Data recovery is completed"],
                "Flash Media":["Tampering Permission Required","Waiting For Tampering Permission","In Analysis Process,________working Days Required","Sample Image/clone Done, Given To Logical Lab For Further Analysis","Looking for Similar Spare","No access yet, trying to get access","No access, needs ____to_____   working days’ time extension",
            "Access received; Chip reading is started","In process, Req. _ Working days’ time extension due to monolithic chip","Req. time extension _working days due to unknown encryption","Req. time extension _ working days due to an unknown Pin-layout of the non-standard chip",
            "Job is in chip-off process, _ working days’ time extension to proceed further"," _ % Chip reading done. (Need No. input)"," _ % Chip reading done of 1 chip (total 4 Chips inside the card). (Need no. input)","Require time extension _ to _ working days’ due to lots of bit errors/Bad columns /others (need Input)",
            "Require time extension _ of working days to take support from our research team","In the initial phase, Chip reading is done but re-reading is in the process further due to lots of bits errors in the chip","Tampered media received, so req. time extension to proceed further (_ working days)",
            "Non-standard chip /controller, req. time extension to find the solution","Chip reading is done","Media is in the analysis process","Advanced scanning of media is started","Req. time extension _ no. of working days due to bad blocks in the media /virus-infected/others","Data recovery is completed"],
                "Tapes":["Tampering Permission Required","Waiting For Tampering Permission","In Analysis Process,________working Days Required","Data recovery is completed"],
                "CD/DVD":["Tampering Permission Required","Waiting For Tampering Permission","In Analysis Process,________working Days Required","Data recovery is completed"],
                "RAID":["Tampering Permission Required","Waiting For Tampering Permission","Waiting For Original PCB/specific Chip (Bios)","Waiting For Missing Specific Chip (Bios)","In Analysis Process,________working Days Required","Sample Image/clone Done, Given To Logical Lab For Further Analysis",
            "Looking for Similar Spare","Access Lost, Trying To Get Access Again","No Access Yet,Heads Found Broken,Spots & Scratches On Platter","No Access Yet , Heads Ribbon Cable Found Burnt , Smoke Layer Found On The Platter","PCB Found Burnt","PCB Connector Found Broken",
            "Access Received , There are ____ Platters and _______ Heads In The Hdd","Water Logged Hdd , Platter Cleaning In Process, _____ Days Extension Required","Burnt Hdd , Platter Cleaning In Process , _______ Days Extension Required","Access Received , Clone Just Started, Very Slow Access Due To Surface Problem",
            "Given To PC-3K For Firmware Repairing","Given To PC-3K For P.C.B. Checking","Given to PC-3K For cloning","Corruption In Specific Chip , Looking For Solution","_______sectors Clone Done With _______ Heads, Total _____ Heads","Waiting For Original PCB / Specific Chip, Recovery Not Possible Without Original PCB/bios",
            "Severe Corruption In Service Area Modules, Case Escalated To Research Team","Corruption In Specific Chip /bios , Case Escalated To Research Team","_______sectors Image Done With _______ Heads, Total _____ Heads","#NAME?","No access yet, trying to get access","No access, needs ____to_____   working days’ time extension",
            "Advanced scanning of media is started","Data recovery is completed"],
                "Other":["Tampering Permission Required","Waiting For Tampering Permission","Waiting For Original PCB/specific Chip (Bios)","Waiting For Missing Specific Chip (Bios)","In Analysis Process,________working Days Required","Sample Image/clone Done, Given To Logical Lab For Further Analysis",
            "Looking for Similar Spare","Access Lost, Trying To Get Access Again","No Access Yet,Heads Found Broken,Spots & Scratches On Platter","No Access Yet , Heads Ribbon Cable Found Burnt , Smoke Layer Found On The Platter","PCB Found Burnt","PCB Connector Found Broken",
            "Access Received , There are ____ Platters and _______ Heads In The Hdd","Water Logged Hdd , Platter Cleaning In Process, _____ Days Extension Required","Burnt Hdd , Platter Cleaning In Process , _______ Days Extension Required","Access Received , Clone Just Started, Very Slow Access Due To Surface Problem",
            "Given To PC-3K For Firmware Repairing","Given To PC-3K For P.C.B. Checking","Given to PC-3K For cloning","Corruption In Specific Chip , Looking For Solution","_______sectors Clone Done With _______ Heads, Total _____ Heads","Waiting For Original PCB / Specific Chip, Recovery Not Possible Without Original PCB/bios",
            "Severe Corruption In Service Area Modules, Case Escalated To Research Team","Corruption In Specific Chip /bios , Case Escalated To Research Team","_______sectors Image Done With _______ Heads, Total _____ Heads","#NAME?","No access yet, trying to get access","No access, needs ____to_____   working days’ time extension",
            "Access received; Chip reading is started","In process, Req. _ Working days’ time extension due to monolithic chip","Req. time extension _working days due to unknown encryption","Req. time extension _ working days due to an unknown Pin-layout of the non-standard chip",
            "Job is in chip-off process, _ working days’ time extension to proceed further"," _ % Chip reading done. (Need No. input)"," _ % Chip reading done of 1 chip (total 4 Chips inside the card). (Need no. input)","Require time extension _ to _ working days’ due to lots of bit errors/Bad columns /others (need Input)",
            "Require time extension _ of working days to take support from our research team","In the initial phase, Chip reading is done but re-reading is in the process further due to lots of bits errors in the chip","Tampered media received, so req. time extension to proceed further (_ working days)",
            "Non-standard chip /controller, req. time extension to find the solution","Chip reading is done","Media is in the analysis process","Advanced scanning of media is started","Req. time extension _ no. of working days due to bad blocks in the media /virus-infected/others","Data recovery is completed"]
        }
        return statusReason[media_type];
    }

    static caseNotPossible(media_type){
        let type = this.checkMediaType(media_type);
        let notPossible = {
            "Hard Drive":["Corruption in specific chip","Corruption in service area","Non availabilty of similar spare","Non availability of original P.C.B.","Magnetic property of platter lost due to overheating","Heavy scratches on platter/s","Heavy scratches on both sides of the platter",
                "Heavy scratches on both sides of the platter, Heads found broken","Heavy scratches on lower side of the platter","Light scratches on lower side of the platter","Heavy scratches on upper side of the platter","Light scratches on upper side of the platter","Heads found broken inside the hard drive",
                "Watter Logged media, not able to clean the foreign particles","Spots and scratches on platter/s","Light scratches in Service area","Group of spots on platter/s","Head burnt and smoke layer found on platter","Not able to write the firmware module","Not able to clean foreign particles",
                "Solution not available at present"],
            "Solid State Drive":["Corruption in the controller chip due to bad sector in the firmware area","Bad sectors in the translator module (Firmware area)","Corruption in the power circuit Area (Power Problem)","Problem in a motherboard of Onboard SSD","Power IC and controller IC Internally Short",
                "Problem in NANDA DATA chip This time solution not available"],
            "Flash Media":["Media found bent/broken, Inetrnal tracks of the chip damaged already","Media received in tampered condition","Data signals are damaged internally","Control signals are damaged internally","Lots of bit errors in this chip","Lots of Bad columns in this chip","Monolithic chip found short",
                "Not able to decrypt Perfect ECC found in the chip","Not able to decrypt Adaptive XOR found in the chip","Unknown pin-layout of the monolithic chip","On Fly Encryption (eg: XOR, Dynamic XOR, Adaptive XOR, LDPC, Hardware encryption) found in the media","Fake chip inside the media",
                "Solution not available at present"],
            "CD/DVD":["CD/DVD surface not Readable","Heavy Scratches on the Surface of CD/DVD"],
            "RAID":["Solution not available at present"],
            "Other":["Required Data not Found","Data Overwritten","Most of the Sectors Internally Zero","Same pattern Written in most of the sectors","Most of the sectors are Garbage Sectors","Encryption Information Overwritten","Encryption Information not Found","CD/DVD disk not finalized",
            "File Severely Damaged","Wrong HDD Provided by Client","Sample Data not Provided by Client","Low Level Formatted","Unknown Encryption","Encryption Details not Received","Corruption was found in the required data","Zero MB data (Empty Data shown)","Solution not available at present"]
        }
        return notPossible[type];
    }

    static partialReason(media_type)
    {
        let type = this.checkMediaType(media_type);
        let reason = {
            "Solid State Drive":['Lots of bad sectors','Firmware issue','Physical Problem'],
            "Hard Drive":['Due to corruption in service area Modules, solution not available this time','Due to scratches on platter','Image done with Lots of Bad sectors']
         };
        return reason[type];
    }




}