FROM ruby:3.2.2

WORKDIR /src/app
COPY Gemfile* ./
RUN bundle install
COPY . .

EXPOSE 4004

RUN rails db:migrate

CMD rails server -b 0.0.0.0

