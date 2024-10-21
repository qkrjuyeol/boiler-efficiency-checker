import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam

#이부분 연결 잘되는지 확인필요
df = pd.read_csv('/content/drive/MyDrive/3months_data.cvs') 

X = df.drop(columns=['효율(순간)'])  # 타겟 변수를 제외한 특징 변수
y = df['효율(순간)']  # 타겟 변수

# 범주형 변수를 제외하고 숫자형 변수만 선택
X_numeric = X.select_dtypes(include=[np.number])

# 학습 데이터와 테스트 데이터로 분리
X_train, X_test, y_train, y_test = train_test_split(X_numeric, y, test_size=0.2, random_state=42)

# 특성 스케일링 (표준화)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 신경망 모델 정의
model = Sequential()

# 입력층 + 첫 번째 은닉층
model.add(Dense(units=64, activation='relu', input_dim=X_train_scaled.shape[1]))

# 두 번째 은닉층
model.add(Dense(units=32, activation='relu'))

# 출력층 (회귀 문제이므로 출력층의 활성화 함수는 없음)
model.add(Dense(units=1))

# Adam 옵티마이저 설정 및 모델 컴파일
model.compile(optimizer=Adam(learning_rate=0.001), loss='mean_squared_error')

# 모델 학습
history = model.fit(X_train_scaled, y_train, epochs=100, batch_size=32, validation_split=0.2, verbose=1)

# 예측
y_pred = model.predict(X_test_scaled)

# 성능 평가
mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mse)  # RMSE 계산

# MAPE 계산
mape = np.mean(np.abs((y_test - y_pred.flatten()) / y_test)) * 100  # MAPE 계산 (백분율로)

# 결과 출력
print(f'테스트 데이터 MSE: {mse}')
print(f'테스트 데이터 MAE: {mae}')
print(f'테스트 데이터 RMSE: {rmse}')
print(f'테스트 데이터 MAPE: {mape:.2f}%')  # MAPE를 소수점 2자리로 포맷

