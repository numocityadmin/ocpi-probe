#  Copyright (c) 2022 Numocity Technologies Private Limited., - All Rights Reserved
#  All source code contained herein remains the property of Numocity  
#  and protected by trade secret or copyright law of India.
#  Dissemination, De-compilation, Modification and Distribution is strictly prohibited unless
#  there is a prior written permission or license agreement from Numocity.
#

FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./

COPY . .

EXPOSE 6000

CMD [ "npm", "start" ]
