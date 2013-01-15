//DATABASE

var Database = {

    Vendor: [
        {
            $ID:            0,
            $Vertical:      [0, 1],                
            Name:           'Getable Rents, Inc.',
            ImageURL:       'http://www.ohs.org/shop/images/Museum-Store_1.jpg',
            Country:        'United States',
            Region:         'California',
            City:           'San Francisco',
            District:       'Financial District',
            Postal:         '94111',
            Address1:       '500 Sansome Street',
            Address2:       'Suite 504'
        },
        {
            $ID:            1,
            $Vertical:      [0],                
            Name:           'Getable Kegerator, LLC',
            ImageURL:       'http://www.ohs.org/shop/images/Museum-Store_1.jpg',
            Country:        'United States',
            Region:         'California',
            City:           'San Francisco',
            District:       'Financial District',
            Postal:         '94111',
            Address1:       '500 Sansome Stree',
            Address2:       'Suite 504: Near the kitchen'
        },
        {
            $ID:            2,
            $Vertical:      [2],                
            Name:           'Hofbrauhaus GmbH',
            ImageURL:       'http://www.ohs.org/shop/images/Museum-Store_1.jpg',
            Country:        'Germany',
            Region:         'Bavaria',
            City:           'Munich',
            District:       'Altstadt',
            Postal:         '80331',
            Address1:       'Platzl 9',
            Address2:       null
        }        
    ],
  
    Vertical: [
        {
            $ID:            0,
            $Category:      [0, 1, 2],
            Name:           'Industrial Equipment',
            ImageURL:       'http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png',
            Rental:         true           
        },
        {
            $ID:            1,
            $Category:      [3],
            Name:           'Construction',
            ImageURL:       'http://www.coasttocoasteventrentals.com/images/showroomSmLabel.jpg',
            Rental:         true           
        },
        {
            $ID:            2,
            $Category:      [4, 5],
            Name:           'Beer',
            ImageURL:       'http://urbanbeerhunt.com/images/beertoast.jpg',
            Rental:         false           
        }          
    ],
  
    Category: [
        {
            $ID:            0,
            $Product:       [0, 1, 2, 3],
            Name:           'Aerial Lifts',
            ImageURL:       'http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png'            
        },
        {
            $ID:            1,
            $Product:       [4, 5],   
            Name:           'Air Compressors',
            ImageURL:       'http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png'            
        },
        {
            $ID:            2,
            $Product:       [6, 7],   
            Name:           'Compaction',
            ImageURL:       'http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png'
        },      
        {
            $ID:            3,
            $Product:       [8, 9, 10],   
            Name:           'Power Tools',
            ImageURL:       'http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png'
        },      
        {
            $ID:            4,
            $Product:       [11, 12],   
            Name:           'Pilsners, Lagers, & Light Ales',
            ImageURL:       'http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png'
        },
        {
            $ID:            5,
            $Product:       [13, 14, 15],   
            Name:           'Craft Brews & Dark Ales',
            ImageURL:       'http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png'
        }      
    ],

    Product: [
        {
            $ID:            0,
            Name:           'Telescopic Boom, 40FT',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',
            Specification: [
                            '2WD',
                            'Dual Fuel, Diesel',
                            'Genie S-40, JLG 400S'
            ]
        },
        {
            $ID:            1,
            Name:           'Telescopic Boom, 120FT',
            Rate:           99,         
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',
            Specification: [
                            '4WD',
                            'Diesel',
                            'Genie S-120, JLG 1200SJP'                            
            ]
        },        
        {
            $ID:            2,
            Name:           'Articulating Boom, 34FT',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',            
            Specification: [
                            '4WD',
                            'Dual Fuel',
                            'Genie Z-34, JLG 34HA'                                                        
            ]
        },
        {
            $ID:            3,
            Name:           'Pusharound, 25FT',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',
            Specification: [
                            '4WD',
                            '49 in. x 29 in."',
                            'JLG 25AM'                            
            ]
        },
        {
            $ID:            4,
            Name:           'Towable, 110CFM',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            '80-125 PSIG',
                            'Diesel',
                            'Sullair 110CFM'
            ]
        }, 
        {
            $ID:            5,
            Name:           'Portable, 185CFM',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            '80-125 PSIG',
                            'Diesel',
                            'Sullair 185CFM, Ingersoll-Rand P185WJD'
            ]
        }, 
        {
            $ID:            6,
            Name:           'Plate, CF: 3000lb.',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            '100-199 lbs.',
                            '15 in. x 23 in.',
                            'Wacker VPR-1340A, Multiquip MVC90L'
            ]
        },         
        {
            $ID:            7,
            Name:           'Double Drum Roller, 39"',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            'Ride-on',
                            '39.4 in. drums',
                            'Wacker RD27, Bomag BW120AD'
            ]
        },   
        {
            $ID:            8,
            Name:           'Horizontal Drill, 3/8", 1/2", 3/4"',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            'Electric, Cordless',
                            'Bosch 1012VSR, Dewalt DW235G, Dewalt D21009, Makita 6408'
            ]
        },
        {
            $ID:            9,
            Name:           'Right-angle Drill, 3/8", 1/2"',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            'Electric, Cordless',
                            'Dewalt DW160, Milwaukee 1676-6, Makita DA4031'
            ]
        }, 
        {
            $ID:            10,
            Name:           'Circular Saw, 7-10"',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            'Electric',
                            'Bosch 1658B, Makita 5201NA'
            ]
        },
        {
            $ID:            11,
            Name:           'Pilzen - Eastern Europe',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            '4-6% ABV',
                            'Pilsner Urquell, Tuzlanski'
            ]
        }, 
        {
            $ID:            12,
            Name:           'Blonde - Western Europe',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            '4-5% ABV',
                            'Duvel (Belgium), Feldschloesschen (Germany), Hop Back (UK)'
            ]
        }, 
        {
            $ID:            13,
            Name:           'Pale Ale - USA, UK',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            '5-6% ABV',
                            'Sierra Nevada Brewing Co. (California), Bow Brewery (England)'
            ]
        },        
        {
            $ID:            14,
            Name:           'Marzen, Dark Lager - Europe',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            '4-9% ABV',
                            'Spaten (Germany), Ayinger - Oktoberfestmaerzen (Germany), Anton Dreher (Austria)'
            ]
        },
        {
            $ID:            15,
            Name:           'Stout - UK, Ireland',
            Rate:           99,
            ImageURL:       'http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg',                        
            Specification: [
                            '4-10% ABV',
                            'Guinness (Ireland), Murphy\'s (Ireland), Samuel Smith (England)'
            ]
        }          
    ],

    User: [
        {
            $ID:              0,
            $Customer:        [0, 1],
            $Admin:           [null],            
            Email:            'benny@getable.com',
            Pass:             'getable',            
            Name:             ['Benny', 'Schmidt'],
            Online:           false
        },
        {
            $ID:              1,
            $Customer:        [0, 1],
            $Admin:           [0],            
            Email:            'tim@getable.com',
            Pass:             'getable',                        
            Name:             ['Tim', 'Hyer'],
            Online:           false
        },
        {
            $ID:              2,
            $Customer:        [1],
            $Admin:           [2],            
            Email:            'kevin@getable.com',
            Pass:             'getable',                        
            Name:             ['Kevin', 'Halter'],
            Online:           false
        },
        {
            $ID:              3,
            $Customer:        [null],
            $Admin:           [0, 1],            
            Email:            'ludo@getable.com',
            Pass:             'getable',                        
            Name:             ['Ludo', 'Goarin'],
            Online:           false
        }
    ],

    Order: [{}]
};

module.exports = { Query: Database };
