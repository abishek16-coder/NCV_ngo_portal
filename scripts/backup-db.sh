#!/bin/bash

DB_URL="${DATABASE_URL}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backups"
BACKUP_FILE="${BACKUP_DIR}/ncv_ngo_backup_${TIMESTAMP}.sql"

mkdir -p ${BACKUP_DIR}

pg_dump "${DB_URL}" > ${BACKUP_FILE}

gzip ${BACKUP_FILE}

find ${BACKUP_DIR} -name "ncv_ngo_backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: ${BACKUP_FILE}.gz"
