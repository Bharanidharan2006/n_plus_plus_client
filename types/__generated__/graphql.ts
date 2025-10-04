export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type Attendance = {
  __typename: 'Attendance';
  attendancePercentage: Scalars['Float']['output'];
  attendanceRecords: Array<AttendanceRecord>;
  attendedContactHours: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  semesterId: Scalars['String']['output'];
  studentRollNo: Scalars['Int']['output'];
  subjectId: Scalars['String']['output'];
  totalContactHours: Scalars['Float']['output'];
};

export type AttendanceRecord = {
  __typename: 'AttendanceRecord';
  attended: Array<Scalars['Boolean']['output']>;
  date: Scalars['DateTime']['output'];
  isUpdated: Scalars['Boolean']['output'];
  monthNumber: Scalars['Float']['output'];
  periods: Array<Scalars['Int']['output']>;
};

export type GetAttendancePercentageOutput = {
  __typename: 'GetAttendancePercentageOutput';
  attendance: Attendance;
  subjectDetails: Subject;
};

export type IndividualRecord = {
  attended: Array<Scalars['Boolean']['input']>;
  rollNo: Scalars['Int']['input'];
};

export type LoginResponse = {
  __typename: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename: 'Mutation';
  changePassword: Scalars['Boolean']['output'];
  createWeekTimeTable: Week;
  deleteWeekTimeTable: Scalars['String']['output'];
  editWeekTimeTable: Week;
  loginUser: LoginResponse;
  logout: Scalars['Boolean']['output'];
  refreshToken: LoginResponse;
  registerUser: RegisterUserOutput;
  updateAttendance: Scalars['Boolean']['output'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateWeekTimeTableArgs = {
  input: CreateWeekTimeTableDto;
};


export type MutationDeleteWeekTimeTableArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditWeekTimeTableArgs = {
  input: EditWeekTimeTableDto;
};


export type MutationLoginUserArgs = {
  password: Scalars['String']['input'];
  rollno: Scalars['Float']['input'];
};


export type MutationLogoutArgs = {
  rollno: Scalars['Float']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationUpdateAttendanceArgs = {
  input: UpdateAttendanceDto;
};

export type Query = {
  __typename: 'Query';
  getAllWeeks: Array<Week>;
  getAttendancePercentage: Array<GetAttendancePercentageOutput>;
  getAttendanceRecord: Attendance;
  getLatestWeek: Week;
  getSubjectDetails: Array<Subject>;
  getUser: User;
  methoddd: Scalars['Int']['output'];
};


export type QueryGetAttendancePercentageArgs = {
  rollNo: Scalars['Float']['input'];
};


export type QueryGetAttendanceRecordArgs = {
  rollNo: Scalars['Float']['input'];
  subjectId: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  token: Scalars['String']['input'];
};

export type Subject = {
  __typename: 'Subject';
  contactHoursPerWeek: Scalars['Float']['output'];
  credits: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  semesterId: Scalars['String']['output'];
  subjectCode: Scalars['String']['output'];
  subjectTitle: Scalars['String']['output'];
  teacherName: Scalars['String']['output'];
};

export type UpdateAttendanceDto = {
  attendanceData: Array<IndividualRecord>;
  date: Scalars['DateTime']['input'];
  periods: Array<Scalars['Int']['input']>;
  subjectCode: Scalars['String']['input'];
};

export type User = {
  __typename: 'User';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  currentSemester: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  masterPassword: Scalars['String']['output'];
  password: Maybe<Scalars['String']['output']>;
  refreshTokenVersion: Scalars['Int']['output'];
  role: Scalars['String']['output'];
  rollNo: Scalars['Float']['output'];
  userName: Scalars['String']['output'];
};

export type Week = {
  __typename: 'Week';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  saturdayStatus: Scalars['Float']['output'];
  startDate: Scalars['DateTime']['output'];
  timeTable: Array<Scalars['String']['output']>;
  weekNo: Scalars['Int']['output'];
};

export type ChangePasswordInput = {
  masterPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rollno: Scalars['Float']['input'];
};

export type CreateWeekTimeTableDto = {
  endDate: Scalars['DateTime']['input'];
  saturdayStatus: Scalars['Float']['input'];
  startDate: Scalars['DateTime']['input'];
  timeTable: Array<Scalars['String']['input']>;
  weekNo: Scalars['Float']['input'];
};

export type EditWeekTimeTableDto = {
  id: Scalars['String']['input'];
  timeTable: Array<Scalars['String']['input']>;
};

export type RegisterUserInput = {
  currentSemester: Scalars['Float']['input'];
  email: Scalars['String']['input'];
  rollNo: Scalars['Float']['input'];
  userName: Scalars['String']['input'];
};

export type RegisterUserOutput = {
  __typename: 'registerUserOutput';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  currentSemester: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  refreshTokenVersion: Scalars['Int']['output'];
  role: Scalars['String']['output'];
  rollNo: Scalars['Float']['output'];
  userName: Scalars['String']['output'];
};

export type GetAttendanceRecordQueryVariables = Exact<{
  rollNo: Scalars['Float']['input'];
  subjectId: Scalars['String']['input'];
}>;


export type GetAttendanceRecordQuery = { getAttendanceRecord: { __typename: 'Attendance', id: string, semesterId: string, studentRollNo: number, subjectId: string, totalContactHours: number, attendedContactHours: number, attendancePercentage: number, attendanceRecords: Array<{ __typename: 'AttendanceRecord', date: Date, periods: Array<number>, monthNumber: number, isUpdated: boolean, attended: Array<boolean> }> } };

export type GetSubjectDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectDetailsQuery = { getSubjectDetails: Array<{ __typename: 'Subject', id: string, subjectCode: string, subjectTitle: string, contactHoursPerWeek: number }> };

export type GetUserQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetUserQuery = { getUser: { __typename: 'User', id: string, email: string, rollNo: number, userName: string, currentSemester: number, role: string, refreshTokenVersion: number, createdAt: Date | null } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { refreshToken: { __typename: 'LoginResponse', accessToken: string, refreshToken: string } };

export type GetLatestWeekQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestWeekQuery = { getLatestWeek: { __typename: 'Week', id: string, weekNo: number, createdAt: Date | null, timeTable: Array<string>, saturdayStatus: number, startDate: Date, endDate: Date } };

export type GetAttendancePercentageQueryVariables = Exact<{
  rollNo: Scalars['Float']['input'];
}>;


export type GetAttendancePercentageQuery = { getAttendancePercentage: Array<{ __typename: 'GetAttendancePercentageOutput', attendance: { __typename: 'Attendance', attendancePercentage: number }, subjectDetails: { __typename: 'Subject', subjectCode: string } }> };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { changePassword: boolean };

export type LoginUserMutationVariables = Exact<{
  rollNo: Scalars['Float']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { loginUser: { __typename: 'LoginResponse', accessToken: string, refreshToken: string } };
