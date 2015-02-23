'use strict';

angular.module('mockedDrivemap', [])
  .value('defaultDrivemapJSON',
    {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
    		'type': 'LineString',
    		'coordinates': [
    			[295774.21909876,4634313.3772155,127.44568310513],
    			[295820.97203854,4634255.2354195,128.71606939886],
    			[295887.72130740,4634169.6680695,130.33972556649],
    			[295989.03796767,4634041.5887762,131.2649955857],
    			[296061.28477189,4633959.4606831,132.01779493679],
    			[296125.53171993,4633868.9712901,129.59767359683],
    			[296150.31446462,4633836.1836293,129.81760656738],
    			[296240.32182351,4633723.7702674,130.7582704241],
    			[296358.44939726,4633573.7258916,133.86830407493],
    			[296397.43847207,4633525.7259986,133.604724355],
    			[296551.36211083,4633330.6074015,136.23849280498],
    			[296877.56110613,4632919.4057818,142.06847265966],
    			[296962.44917283,4632811.0066301,142.89895118832],
    			[297028.24698454,4632726.9230089,142.33394666297],
    			[297057.71274689,4632730.3808028,141.17053660073],
    			[297175.26509966,4632851.4592347,140.53941483505],
    			[297193.0813674,4632870.3611034,139.70076258553]
    		],
    		'lookatpath': [
    			[295774.21909876,4634313.3772155,127.44568310513],
    			[295820.97203854,4634255.2354195,128.71606939886],
    			[295887.72130740,4634169.6680695,130.33972556649],

    			[296000.8980502824,4634049.85480698,131.9302210876948],

    			[295992.86350810324,4634018.059967569,131.21503376589865],

    			[296011.0481164245,4633997.626497681,131.93536793240966],

    			[296056.86967718083,4633984.9234109,133.18456290966913],

    			[296061.28477189,4633959.4606831,132.01779493679],

    			[296096.4400544114,4633879.031083194,138.02339647285814],

    			[296125.53171993,4633868.9712901,129.59767359683],

    			[296131.13910925534,4633846.786669702,129.76598671137342],

    			[296150.31446462,4633836.1836293,129.81760656738],

    			[296263.6329560577,4633734.206468178,134.2389040619932],

    			[296259.0486452448,4633700.076316996,131.1838632144419],

    			[296358.44939726,4633573.7258916,133.86830407493],
    			[296397.43847207,4633525.7259986,133.604724355],
    			[296551.36211083,4633330.6074015,136.23849280498],
    			[296877.56110613,4632919.4057818,142.06847265966],
    			[296962.44917283,4632811.0066301,142.89895118832],
    			[297028.24698454,4632726.9230089,142.33394666297],
    			[297057.71274689,4632730.3808028,141.17053660073],
    			[297175.26509966,4632851.4592347,140.53941483505],
    			[297193.0813674,4632870.3611034,139.70076258553]
    		]
        },
        'properties': {
          'pointcloud': 'http://148.251.106.132:8090/POTREE/PC/BACK/DRIVE_1_V3/DRIVE_1_V3_levels_8/cloud.js',
          'pointcloud_site': 'http://148.251.106.132:8090/POTREE/PC/SITE/S162/SITE_162_cleaned_ALIGNED_DRIVE_1_V3/SITE_162_ALIGNED_DRIVE_1_V3_level4/cloud.js'
        },
        'id': 'DRIVE_1_V3'
      }],

      'crs': {
        'type': 'name',
        'properties': {
          'name': 'urn:ogc:def:crs:EPSG::32633'
        }
      }
  });
