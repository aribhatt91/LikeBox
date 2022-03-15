//https://www.craghoppers.com/sizing-guides/
//https://www.bellfieldclothing.com/pages/size-guide
const SIZE_CHART = {
    'bellfield': [
    {
        tags: ['jacket', 'top', 'coat', 'gillet', 'sweatshirt', 'hoodies', 'shirt', 't-shirt', 'tshirt', 'vest'],
        sizes: {
                'S': {
                    inch: ['36-38'],
                    cm: ['91-96']
                },
                'M': {
                    inch: ['38-40'],
                    cm: ['96-101']
                },
                'L': {
                    inch: ['40-42'],
                    cm: ['101-106']
                },
                'XL': {
                    inch: ['44-46'],
                    cm: ['106-111']
                }
            
        },
        instruction: 'To choose the correct sized for you, measure your chest around the fullest part, placing your measuring tape close under the arms and make sure the tape is flat across your back.'
    },
    {
        tags: ['jeans', 'trousers','shorts', 'joggers', 'swimshorts'],
        sizes: {
                'XS': {
                    inch: [28],
                    cm: [71]
                },
                'S': {
                    inch: [30],
                    cm: [76]
                },
                'M': {
                    inch: [32],
                    cm: [81]
                },
                'L': {
                    inch: [34],
                    cm: [86]
                },
                'XL': {
                    inch: [36],
                    cm: [91]
                }
            
        },
        instruction: 'To choose the correct size for you, measure around the fullest part of your natural waist, placing the tape close and make sure the tape is flat across the small of your back.'
    }],
    'farah': [
        {
            tags: ['jacket', 'top', 'coat', 'gillet', 'sweatshirt', 'hoodies', 'shirt', 't-shirt', 'tshirt', 'vest'],
            sizes: {
                'XS': {
                    inch: ['33-35'],
                    cm: ['84-89']
                },
                'S': {
                    inch: ['36-38'],
                    cm: ['90-96']
                },
                'M': {
                    inch: ['39-40'],
                    cm: ['97-103']
                },
                'L': {
                    inch: ['41-43'],
                    cm: ['104-109']
                },
                'XL': {
                    inch: ['44-45'],
                    cm: ['110-115']
                },
                'XXL': {
                    inch: ['46-48'],
                    cm: ['116-121']
                }
                
            },
            instruction: 'To choose the correct sized for you, measure your chest around the fullest part, placing your measuring tape close under the arms and make sure the tape is flat across your back.'
        },
        {
            tags: ['jeans', 'trousers','shorts', 'joggers', 'swimshorts'],
            sizes: {
                    'XS': {
                        inch: ['28-29'],
                        cm: ['71-73']
                    },
                    'S': {
                        inch: ['30-31'],
                        cm: ['76-39']
                    },
                    'M': {
                        inch: ['32-33'],
                        cm: ['81-84']
                    },
                    'L': {
                        inch: ['34-35'],
                        cm: ['86-90']
                    },
                    'XL': {
                        inch: ['36-37'],
                        cm: ['91-95']
                    },
                    'XXL': {
                        inch: ['38-39'],
                        cm: ['96-101']
                    }
                
            },
            instruction: 'To choose the correct size for you, measure around the fullest part of your natural waist, placing the tape close and make sure the tape is flat across the small of your back.'
        }],
    'original penguin': [
        {
            tags: ['jacket', 'top', 'coat', 'gillet', 'sweatshirt', 'hoodies', 'shirt', 't-shirt', 'tshirt', 'vest'],
            sizes: {
                'XS': {
                    inch: ['36-37'],
                    cm: ['92-96']
                },
                'S': {
                    inch: ['38-39'],
                    cm: ['96-100']
                },
                'M': {
                    inch: ['40-42'],
                    cm: ['100-109']
                },
                'L': {
                    inch: ['43-45'],
                    cm: ['109-116']
                },
                'XL': {
                    inch: ['46-48'],
                    cm: ['116-123']
                },
                'XXL': {
                    inch: ['49-51'],
                    cm: ['123-131']
                }
                
            },
            instruction: 'To choose the correct sized for you, measure your chest around the fullest part, placing your measuring tape close under the arms and make sure the tape is flat across your back.'
        },
        {
            tags: ['jeans', 'trousers','shorts', 'joggers', 'swimshorts'],
            sizes: {
                'XS': {
                    inch: ['28-29'],
                    cm: ['71-73']
                },
                'S': {
                    inch: ['30-31'],
                    cm: ['76-39']
                },
                'M': {
                    inch: ['32-33'],
                    cm: ['81-84']
                },
                'L': {
                    inch: ['34-35'],
                    cm: ['86-90']
                },
                'XL': {
                    inch: ['36-37'],
                    cm: ['91-95']
                },
                'XXL': {
                    inch: ['38-39'],
                    cm: ['96-101']
                }
                
            },
            instruction: 'To choose the correct size for you, measure around the fullest part of your natural waist, placing the tape close and make sure the tape is flat across the small of your back.'
        }],
    'craghoppers': [
    {
        tags: ['jacket', 'top', 'coat', 'gillet', 'sweatshirt', 'hoodies', 'shirt', 't-shirt', 'tshirt', 'vest'],
        sizes: {
            'XS': {
                inch: ['35-37'],
                cm: ['87-93']
            },
            'S': {
                inch: ['38-39'],
                cm: ['94-99']
            },
            'M': {
                inch: ['40-42'],
                cm: ['100-105']
            },
            'L': {
                inch: ['43-45'],
                cm: ['106-113']
            },
            'XL': {
                inch: ['46-47'],
                cm: ['114-120']
            },
            'XXL': {
                inch: ['49-51'],
                cm: ['121-128']
            }
            
        },
        instruction: 'To choose the correct sized for you, measure your chest around the fullest part, placing your measuring tape close under the arms and make sure the tape is flat across your back.'
    },
    {
        tags: ['jeans', 'trousers','shorts', 'joggers', 'swimshorts'],
        sizes: {
            'XS': {
                inch: ['28-29'],
                cm: ['71-73']
            },
            'S': {
                inch: ['30-31'],
                cm: ['76-39']
            },
            'M': {
                inch: ['32-33'],
                cm: ['81-84']
            },
            'L': {
                inch: ['34-35'],
                cm: ['86-90']
            },
            'XL': {
                inch: ['36-37'],
                cm: ['91-95']
            },
            'XXL': {
                inch: ['38-39'],
                cm: ['96-101']
            }
            
        },
        instruction: 'To choose the correct size for you, measure around the fullest part of your natural waist, placing the tape close and make sure the tape is flat across the small of your back.'
    }],
    'asket': [
        {
            tags: ['jacket', 'top', 'coat', 'gillet', 'sweatshirt', 'hoodies', 'shirt', 't-shirt', 'tshirt', 'vest'],
            sizes: {
                'XS': {
                    inch: ['18.1-19.2'],
                    cm: ['46-48']
                },
                'S': {
                    inch: ['19.3-20.4'],
                    cm: ['49-51']
                },
                'M': {
                    inch: ['20.5-21.6'],
                    cm: ['52-54']
                },
                'L': {
                    inch: ['21.7-22.7'],
                    cm: ['55-57']
                },
                'XL': {
                    inch: ['22.8-23.8'],
                    cm: ['58-61']
                }
                
            },
            instruction: 'To choose the correct sized for you, measure your chest around the fullest part, placing your measuring tape close under the arms and make sure the tape is flat across your back.'
        },
        {
            tags: ['jeans', 'trousers','shorts', 'joggers', 'swimshorts'],
            sizes: {
                'XS': {
                    inch: ['28-29'],
                    cm: ['71-73']
                },
                'S': {
                    inch: ['30-31'],
                    cm: ['76.6-39']
                },
                'M': {
                    inch: ['32-33'],
                    cm: ['81.6-84']
                },
                'L': {
                    inch: ['34-35'],
                    cm: ['86.6-90']
                },
                'XL': {
                    inch: ['36-37'],
                    cm: ['91.6-95']
                },
                'XXL': {
                    inch: ['38-39'],
                    cm: ['96.6-101']
                }
            },
            instruction: 'To choose the correct size for you, measure around the fullest part of your natural waist, placing the tape close and make sure the tape is flat across the small of your back.'
        }]
};

export default SIZE_CHART;