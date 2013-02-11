
var dbSchema = {

    // vendors collection
    "vendors": [{
        "_id": ObjectID,
        "vertical_ids": [VERTICAL_ID],
        "name": string,
        "image_url": string,
        "coordinates": {
            "long": float,
            "lat": float
        },
        "address": {
            "street": string,
            "street2": string,
            "city": string,
            "state": string,
            "postal_code": string,
            "country": string
        },
        "contact": {
            "phone": string,
            "url": string,
            "email": string
        },
        "products": [{
            "product_id": PRODUCT_ID,
            "sku": string,
            "manufacturer": string
        }]
    }],

    // verticals collection
    "verticals": [{
        "_id": ObjectID,
        "name": string,
        "image_url": string
    }],

    // categories collection
    "categories": [{
        "_id": ObjectID,
        "key": string,
        "parent_key": string,
        "vertical_id": VERTICAL_ID,
        "name": string,
        "image_url": string
    }],

    // products collection
    "products": [{
        "_id": ObjectID,
        "key": string,
        "category_ids": [CATEGORY_ID],
        "name": string,
        "description": string,
        "type": string,
        "image_url": string,
        "attribute_ids": [ATTRIBUTE_ID],
        "rates": [{
            "unit": string,
            "unit_count": int,
            "price": float
        }]
    }],

    // order requests
    "requests": [{
        "_id": ObjectID,
        "user_id": USER_ID,
        "time_stamp": datetime,
        "status": string,
        "line_items": [{
            "_id": ObjectID,
            "status": string,
            "product_id": PRODUCT_ID,
            "name": string,
            "product_code": string,
            "quantity": int
        }],
        "start": datetime,
        "end": datetime,
        target_vendors: [VENDOR_ID]
    }],

    // orders collection
    "orders": [{
        "_id": ObjectID,
        "user_id": USER_ID,
        "vendor _id": VENDOR_ID,
        "time_stamp": datetime,
        "status": string,
        "line_items": [{
            "_id": ObjectID,
            "status": string,
            "product_id": PRODUCT_ID,
            "name": string,
            "product_code": string,
            "quantity": int,
            "start": datetime,
            "end": datetime,
            "quote": {
                "product": {
                    "name": string,
                    "sku": string
                },
                "price": float,
                "rates": [{
                    "unit": string,
                    "unit_count": int,
                    "price": float
                }]
            }
        }],
        "delivery": {
            "requested": boolean,
            "address": {
                "street": string,
                "street2": string,
                "city": string,
                "state": string,
                "postal_code": string,
                "country": string
            },
            "requested_time": datetime,
            "estimated_time": datetime
        },
        "messages": [{
            "from": string,
            "type": string,
            "time_stamp": datetime,
            "text": string
        }]
    }],

    // users collection
    "users": [{
        "_id": ObjectID,
        "organization_id": ORGANIZATION_ID,
        "username": string,
        "password": string,
        "profile": {
            "first_name": string,
            "last_name": string,
            "email": string,
            "phone": string
        },
        "address": {
            "street": string,
            "street2": string,
            "city": string,
            "state": string,
            "postal_code": string,
            "country": string
        }
    }],

    // organizations collection
    "organizations": [{
        "_id": ObjectID,
        "name": string
    }],

    // manufacturers collection
    "manufacturers": [{
        "_id": ObjectID,
        "name": string
    }],

    // product attributes collection
    "attributes": [{
        "_id": ObjectID,
        "key": string,
        "name": string,
        "input_type": string,
        "data_type": string,
        "options": [string]
    }]
}