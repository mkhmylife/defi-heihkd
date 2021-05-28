#!/usr/bin/bash
docker build -t mokkahei24/heihkd-frontend . && \
docker push mokkahei24/heihkd-frontend && \
kubectl -n heihkd patch deployment frontend  -p "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"
