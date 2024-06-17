FROM node:alpine

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

#RUN chmod -R a+x node_modules
#RUN chmod -R a+x .next
#RUN addgroup nodejs
#RUN adduser -SDH nextjs
#RUN mkdir -p .next
#RUN chown nextjs:nodejs .next
#
#USER nextjs
#
## Set correct permissions for nextjs user and don't run as root
#RUN addgroup nodejs
#RUN adduser -SDH nextjs
#RUN mkdir .next
#RUN chown nextjs:nodejs .next
#
## Automatically leverage output traces to reduce image size
## https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#COPY --from=builder --chown=nextjs:nodejs /app/public ./public



EXPOSE 3000


RUN npm run build

CMD ["npm", "start"]

