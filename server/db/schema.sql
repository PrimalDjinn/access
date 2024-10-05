create or replace function updated_at() returns trigger as
$$
begin
    new.updated_at = current_timestamp;
    return new;
end;
$$ language plpgsql;

create table if not exists users (
    ulid varchar(26) primary key,
    email varchar(255) not null,
    password varchar(255) not null,
    picture text,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create or replace trigger users_updated_at before update on users
for each row execute function updated_at();

create table if not exists tokens (
    ulid varchar(26) primary key,
    user_ulid varchar(26) not null references users(ulid),
    value varchar(255) not null unique,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create or replace trigger tokens_updated_at before update on tokens
for each row execute function updated_at();
