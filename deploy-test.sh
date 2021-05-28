#!/usr/bin/bash
docker build -t mokkahei24/heihkd-frontend:edge . && \
docker push mokkahei24/heihkd-frontend:edge && \
kubectl -n heihkd-test patch deployment frontend  -p "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"
