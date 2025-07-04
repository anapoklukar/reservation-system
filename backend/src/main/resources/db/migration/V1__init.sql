CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_resource
        FOREIGN KEY(resource_id)
        REFERENCES resources(id)
        ON DELETE CASCADE
);

-- Sample resources (rooms)
INSERT INTO resources (name) VALUES
                                 ('Room A'),
                                 ('Room B'),
                                 ('Room C'),
                                 ('Room D'),
                                 ('Room E');

-- Sample reservations for the week June 30 – July 6, 2025
INSERT INTO reservations (resource_id, title, start_at, end_at) VALUES
-- Monday (June 30)
(1, 'Team Sync',         '2025-06-30T09:00:00', '2025-06-30T10:00:00'),
(2, 'Client Call',       '2025-06-30T10:00:00', '2025-06-30T11:30:00'),
(1, 'Design Review',     '2025-06-30T11:00:00', '2025-06-30T11:30:00'),
(3, 'Strategy Brief',    '2025-06-30T14:00:00', '2025-06-30T15:30:00'),
(4, 'UX Testing',        '2025-06-30T16:00:00', '2025-06-30T17:00:00'),

-- Tuesday (July 1)
(1, 'Workshop Prep',     '2025-07-01T13:00:00', '2025-07-01T15:00:00'),
(2, 'QA Session',        '2025-07-01T14:30:00', '2025-07-01T16:00:00'),
(3, 'Interview',         '2025-07-01T10:00:00', '2025-07-01T11:00:00'),
(5, 'Brainstorming',     '2025-07-01T11:00:00', '2025-07-01T12:00:00'),

-- Wednesday (July 2)
(1, 'Sprint Planning',   '2025-07-02T10:00:00', '2025-07-02T11:00:00'),
(2, 'Bug Bash',          '2025-07-02T11:00:00', '2025-07-02T13:00:00'),
(4, 'Recruiting',        '2025-07-02T09:00:00', '2025-07-02T09:45:00'),
(3, 'Marketing Sync',    '2025-07-02T14:00:00', '2025-07-02T15:00:00'),

-- Thursday (July 3)
(5, 'Code Review',       '2025-07-03T09:30:00', '2025-07-03T10:30:00'),
(2, 'Sales Meeting',     '2025-07-03T11:00:00', '2025-07-03T12:30:00'),
(3, 'UX Audit',          '2025-07-03T15:00:00', '2025-07-03T16:00:00'),

-- Friday (July 4)
(1, 'Internal Demo',     '2025-07-04T14:00:00', '2025-07-04T15:00:00'),
(4, 'Data Workshop',     '2025-07-04T10:00:00', '2025-07-04T12:00:00'),
(5, 'Team Lunch',        '2025-07-04T12:00:00', '2025-07-04T13:00:00'),

-- Saturday (July 5)
(2, 'Weekend Hackathon', '2025-07-05T09:00:00', '2025-07-05T17:00:00'),
(3, 'Study Group',       '2025-07-05T10:00:00', '2025-07-05T12:00:00'),

-- Sunday (July 6)
(4, 'Maintenance Window','2025-07-06T06:00:00', '2025-07-06T08:00:00'),
(1, 'Deployment Review', '2025-07-06T18:00:00', '2025-07-06T20:00:00'),

-- Monday (July 7)
(1, 'Morning Standup',    '2025-07-07T09:00:00', '2025-07-07T09:30:00'),
(3, 'Technical Interview','2025-07-07T10:00:00', '2025-07-07T11:30:00'),
(5, 'Code Pairing',       '2025-07-07T08:30:00', '2025-07-07T10:00:00'),
(2, 'Design Critique',    '2025-07-07T15:00:00', '2025-07-07T16:00:00'),

-- Tuesday (July 8)
(1, 'Weekly Retro',       '2025-07-08T10:00:00', '2025-07-08T11:00:00'),
(3, 'Architecture Review','2025-07-08T13:00:00', '2025-07-08T14:30:00'),
(5, 'Performance Review', '2025-07-08T11:30:00', '2025-07-08T12:30:00'),
(2, 'Legal Consultation', '2025-07-08T16:00:00', '2025-07-08T17:00:00'),

-- Wednesday (July 9)
(1, 'Feature Planning',   '2025-07-09T09:00:00', '2025-07-09T10:30:00'),
(2, 'Customer Feedback',  '2025-07-09T10:00:00', '2025-07-09T11:30:00'),
(3, 'Database Migration', '2025-07-09T08:00:00', '2025-07-09T09:00:00'),
(4, 'Training Session',   '2025-07-09T13:30:00', '2025-07-09T15:00:00'),
(1, 'Status Update',      '2025-07-09T16:00:00', '2025-07-09T16:30:00'),
(2, 'API Review',         '2025-07-09T15:00:00', '2025-07-09T16:30:00'),

-- Thursday (July 10)
(1, 'Sprint Demo',        '2025-07-10T11:00:00', '2025-07-10T12:00:00'),
(3, 'Infrastructure Call','2025-07-10T10:00:00', '2025-07-10T11:00:00'),
(1, 'Partnership Meeting','2025-07-10T14:30:00', '2025-07-10T16:00:00'),

-- Friday (July 11)
(1, 'Release Planning',   '2025-07-11T10:00:00', '2025-07-11T11:30:00'),
(2, 'Team Building',      '2025-07-11T14:00:00', '2025-07-11T16:00:00'),
(3, 'Documentation Review','2025-07-11T09:00:00', '2025-07-11T10:00:00'),
(4, 'Analytics Review',   '2025-07-11T11:00:00', '2025-07-11T12:00:00'),
(5, 'Innovation Hour',    '2025-07-11T15:00:00', '2025-07-11T16:00:00'),

-- Saturday (July 12)
(2, 'Community Event',    '2025-07-12T14:00:00', '2025-07-12T16:00:00'),
(3, 'System Maintenance', '2025-07-12T08:00:00', '2025-07-12T10:00:00'),
(4, 'Volunteer Training', '2025-07-12T13:00:00', '2025-07-12T15:00:00'),
(5, 'Gaming Tournament',  '2025-07-12T16:00:00', '2025-07-12T18:00:00'),

-- Sunday (July 13)
(1, 'Emergency Response', '2025-07-13T07:00:00', '2025-07-13T08:00:00'),
(2, 'Server Patching',    '2025-07-13T05:00:00', '2025-07-13T07:00:00'),
(3, 'Backup Verification','2025-07-13T09:00:00', '2025-07-13T10:00:00'),
(4, 'Sunday Planning',    '2025-07-13T19:00:00', '2025-07-13T20:00:00'),
(5, 'Team Sync',          '2025-07-13T18:00:00', '2025-07-13T19:00:00');
