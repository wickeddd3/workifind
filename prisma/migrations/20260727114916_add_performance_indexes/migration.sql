-- CreateIndex
CREATE INDEX "applicants_createdAt_idx" ON "applicants"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "employers_createdAt_idx" ON "employers"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "jobApplications_userId_jobId_idx" ON "jobApplications"("userId", "jobId");

-- CreateIndex
CREATE INDEX "jobApplications_jobId_idx" ON "jobApplications"("jobId");

-- CreateIndex
CREATE INDEX "jobApplications_applicantId_idx" ON "jobApplications"("applicantId");

-- CreateIndex
CREATE INDEX "jobs_approved_createdAt_idx" ON "jobs"("approved", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "jobs_userId_createdAt_idx" ON "jobs"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "jobs_employmentType_idx" ON "jobs"("employmentType");

-- CreateIndex
CREATE INDEX "jobs_locationType_idx" ON "jobs"("locationType");

-- CreateIndex
CREATE INDEX "jobs_employerId_idx" ON "jobs"("employerId");

-- CreateIndex
CREATE INDEX "savedJobs_userId_jobId_idx" ON "savedJobs"("userId", "jobId");

-- CreateIndex
CREATE INDEX "savedJobs_jobId_idx" ON "savedJobs"("jobId");

-- CreateIndex
CREATE INDEX "savedJobs_applicantId_idx" ON "savedJobs"("applicantId");
